import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { extractTextFromFile } from "@/lib/extract";
import { generateCV } from "@/lib/anthropic";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const jobDescription = formData.get("jobDescription") as string;
    const extraInfo = formData.get("extraInfo") as string;

    if (!jobDescription) {
      return NextResponse.json({ error: "A descrição da vaga é obrigatória." }, { status: 400 });
    }

    // 1. Verificar créditos
    const supabase = getSupabaseAdmin();
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("credits_used, credits_limit")
      .eq("id", session.user.id)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    if (user.credits_used >= user.credits_limit) {
      return NextResponse.json({ error: "Créditos insuficientes. Faça um upgrade." }, { status: 403 });
    }

    // 2. Extração de Texto (se arquivo fornecido)
    let cvText = "";
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      cvText = await extractTextFromFile(buffer, file.type);
    } else {
      // Se não tem arquivo, tentar pegar do perfil salvo
      const { data: profile } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", session.user.id)
        .single();
      
      if (!profile) {
        return NextResponse.json({ error: "Por favor, envie seu currículo atual." }, { status: 400 });
      }
      
      cvText = JSON.stringify(profile);
    }

    // 3. Chamar Anthropic para gerar o match
    const optimizedCV = await generateCV(cvText, jobDescription, extraInfo);

    // 4. Salvar Perfil / Memória (user_profile)
    // Atualizamos o perfil do usuário com as informações extraídas pela IA
    const { error: profileError } = await supabase
      .from("user_profile")
      .upsert({
        user_id: session.user.id,
        hard_skills: optimizedCV.hard_skills,
        soft_skills: optimizedCV.soft_skills,
        experiences: optimizedCV.experience,
        education: optimizedCV.education,
        languages: optimizedCV.languages,
        certifications: optimizedCV.certifications,
        last_updated: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (profileError) {
      console.error("Erro ao salvar perfil:", profileError);
    }

    // 5. Salvar Histórico e Consumir Crédito
    console.log("💾 Salvando histórico para o usuário:", session.user.id);
    
    const { data: history, error: historyError } = await supabase
      .from("cv_history")
      .insert({
        user_id: session.user.id,
        job_title: optimizedCV.profile.role || "Especialista",
        company: "Vaga Otimizada",
        cv_output: optimizedCV
      })
      .select()
      .single();

    if (historyError) {
      console.error("❌ ERRO AO SALVAR HISTÓRICO:", historyError);
      throw new Error(`Falha ao salvar histórico: ${historyError.message}`);
    }

    console.log("💳 Descontando crédito...");
    const { error: rpcError } = await supabase.rpc('increment_credits', { user_id: session.user.id });
    
    if (rpcError) {
      console.error("❌ ERRO AO DESCONTAR CRÉDITO:", rpcError);
      // Não travamos o fluxo aqui para o usuário não perder o CV já gerado, 
      // mas logamos o erro crítico.
    }

    return NextResponse.json({ 
      success: true, 
      cv: optimizedCV,
      historyId: history?.id 
    });

  } catch (err: any) {
    console.error("ERRO CRÍTICO NA GERAÇÃO DE CV:", err);
    
    // Garantimos que o erro retorne como JSON e não como uma página HTML de erro
    return new NextResponse(
      JSON.stringify({ 
        error: err.message || "Erro interno na geração do currículo.",
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
