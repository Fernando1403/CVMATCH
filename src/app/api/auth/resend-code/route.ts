import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "E-mail é obrigatório." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 1. Verificar se existe um registro pendente para esse e-mail
    const { data: existingCode } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", email)
      .eq("type", "signup")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!existingCode) {
      return NextResponse.json({ error: "Nenhum cadastro pendente encontrado." }, { status: 404 });
    }

    // 2. Gerar novo código e atualizar expiração
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 30 * 60000); // +30 min

    const { error: updateError } = await supabase
      .from("verification_codes")
      .update({
        code: newCode,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString() // Reseta o timestamp de criação
      })
      .eq("id", existingCode.id);

    if (updateError) {
      return NextResponse.json({ error: "Erro ao gerar novo código." }, { status: 500 });
    }

    // 3. Reenviar e-mail
    const { sendVerificationEmail } = await import("@/lib/mail");
    await sendVerificationEmail(email, newCode);

    return NextResponse.json({ message: "Novo código enviado!" }, { status: 200 });
  } catch (err) {
    console.error("Erro no reenvio:", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
