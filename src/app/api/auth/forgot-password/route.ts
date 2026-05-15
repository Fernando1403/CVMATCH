import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "O e-mail é obrigatório." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 1. Verificar se o usuário existe
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (!user) {
      // Por segurança, não confirmamos se o e-mail existe ou não
      return NextResponse.json({ message: "Se o e-mail estiver cadastrado, você receberá um código." }, { status: 200 });
    }

    // 2. Gerar código de 6 dígitos
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60000); // 15 minutos de validade

    // 3. Salvar no banco
    const { error } = await supabase
      .from("verification_codes")
      .insert([
        {
          email,
          code: resetCode,
          type: "password_reset",
          expires_at: expiresAt.toISOString(),
        },
      ]);

    if (error) {
      return NextResponse.json({ error: "Erro ao gerar código de recuperação." }, { status: 500 });
    }

    // 4. Enviar e-mail (Background)
    const { sendPasswordResetEmail } = await import("@/lib/mail");
    sendPasswordResetEmail(email, resetCode);

    return NextResponse.json({ message: "Código enviado com sucesso!" }, { status: 200 });
  } catch (err) {
    console.error("Erro no forgot-password:", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
