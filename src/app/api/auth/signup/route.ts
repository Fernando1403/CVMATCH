import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password, cpf, nome } = await request.json();

    if (!email || !password || !cpf || !nome) {
      return NextResponse.json(
        { error: "Todos os campos (Nome, Email, Senha e CPF) são obrigatórios." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // 1. Verificar se o email já existe
    const { data: userByEmail } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (userByEmail) {
      return NextResponse.json(
        { error: "Este email já está cadastrado." },
        { status: 400 }
      );
    }

    // 2. Verificar se o CPF já existe
    const { data: userByCpf } = await supabase
      .from("users")
      .select("id")
      .eq("cpf", cpf)
      .single();

    if (userByCpf) {
      return NextResponse.json(
        { error: "Este CPF já está cadastrado em outra conta." },
        { status: 400 }
      );
    }

    // 3. Gerar código de verificação
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 30 * 60000); // 30 minutos

    // Hash da senha antecipado (para salvar no payload)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Salvar código E dados do usuário pendente no banco
    const { error: codeError } = await supabase
      .from("verification_codes")
      .insert([
        {
          email,
          code: verificationCode,
          type: "signup",
          expires_at: expiresAt.toISOString(),
          payload: {
            nome,
            email,
            cpf,
            password_hash: hashedPassword
          }
        },
      ]);

    if (codeError) {
      console.error("Erro ao salvar código de verificação:", codeError);
      return NextResponse.json(
        { error: "Erro ao processar cadastro. Tente novamente." },
        { status: 500 }
      );
    }

    // Enviar e-mail (Background)
    const { sendVerificationEmail } = await import("@/lib/mail");
    sendVerificationEmail(email, verificationCode);

    return NextResponse.json(
      { 
        message: "Código enviado! Verifique seu e-mail para ativar a conta.", 
        requiresVerification: true 
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erro no servidor no signup:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
