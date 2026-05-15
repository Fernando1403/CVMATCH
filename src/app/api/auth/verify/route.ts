import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: "E-mail e código são obrigatórios." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 1. Buscar o código mais recente para esse e-mail e tipo
    const { data: verification, error: fetchError } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", email)
      .eq("code", code)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !verification) {
      return NextResponse.json({ error: "Código inválido ou expirado." }, { status: 400 });
    }

    // 2. Verificar expiração
    if (new Date(verification.expires_at) < new Date()) {
      return NextResponse.json({ error: "Este código expirou. Peça um novo." }, { status: 400 });
    }

    // 3. Se for tipo 'signup', criar o usuário agora
    if (verification.type === "signup" && verification.payload) {
      const { nome, email: userEmail, cpf, password_hash } = verification.payload;

      const { error: insertError } = await supabase
        .from("users")
        .insert([
          {
            email: userEmail,
            name: nome, // Salvando o nome real
            cpf,
            password_hash,
            plan: "free",
            credits_used: 0,
            credits_limit: 2,
            email_verified: new Date().toISOString()
          },
        ]);

      if (insertError) {
        console.error("Erro ao criar usuário na verificação:", insertError);
        return NextResponse.json({ error: "Erro ao criar conta final. Tente novamente." }, { status: 500 });
      }
    } else if (verification.type === "signup") {
        // Fallback caso não tenha payload (erro de lógica anterior)
        return NextResponse.json({ error: "Dados de cadastro não encontrados. Tente se cadastrar novamente." }, { status: 400 });
    }

    // 4. Se for apenas verificação (sem ser criação), marcar como verificado (caso o usuário já existisse mas estivesse pendente)
    if (verification.type !== "signup") {
      await supabase
        .from("users")
        .update({ email_verified: new Date().toISOString() })
        .eq("email", email);
    }

    // 5. Deletar o código usado (limpeza)
    await supabase.from("verification_codes").delete().eq("id", verification.id);

    return NextResponse.json({ message: "Conta ativada com sucesso!" }, { status: 200 });
  } catch (err) {
    console.error("Erro na verificação:", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
