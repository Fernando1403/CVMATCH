import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, code, newPassword } = await request.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 1. Buscar o código de reset mais recente
    const { data: verification, error: fetchError } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", email)
      .eq("code", code)
      .eq("type", "password_reset")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !verification) {
      return NextResponse.json({ error: "Código inválido ou expirado." }, { status: 400 });
    }

    // 2. Verificar expiração (15 min)
    if (new Date(verification.expires_at) < new Date()) {
      return NextResponse.json({ error: "Este código expirou. Peça um novo." }, { status: 400 });
    }

    // 3. Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Atualizar senha do usuário
    const { error: updateError } = await supabase
      .from("users")
      .update({ password_hash: hashedPassword })
      .eq("email", email);

    if (updateError) {
      return NextResponse.json({ error: "Erro ao atualizar senha." }, { status: 500 });
    }

    // 5. Deletar o código usado
    await supabase.from("verification_codes").delete().eq("id", verification.id);

    return NextResponse.json({ message: "Senha redefinida com sucesso!" }, { status: 200 });
  } catch (err) {
    console.error("Erro no reset-password:", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
