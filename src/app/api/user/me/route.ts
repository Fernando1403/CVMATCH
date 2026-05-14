import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    // Busca os dados atualizados do usuário
    const { data: user, error } = await supabase
      .from("users")
      .select("credits_used, credits_limit, plan")
      .eq("id", session.user.id)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Busca o histórico de CVs
    const { data: history } = await supabase
      .from("cv_history")
      .select("*")
      .eq("user_id", session.user.id)
      .order("generated_at", { ascending: false });

    return NextResponse.json({
      user,
      history: history || []
    });
  } catch (err) {
    console.error("Erro na API /user/me:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
