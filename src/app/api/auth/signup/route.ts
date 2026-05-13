import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Verificar se o usuário já existe
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Este email já está cadastrado." },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário com 2 créditos iniciais (conforme o planner)
    const { data: newUser, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          password_hash: hashedPassword,
          plan: "free",
          credits_used: 0,
          credits_limit: 2,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Erro ao criar usuário no Supabase:", error);
      return NextResponse.json(
        { error: "Erro ao criar conta. Tente novamente mais tarde." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Usuário criado com sucesso!", user: { email: newUser.email } },
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
