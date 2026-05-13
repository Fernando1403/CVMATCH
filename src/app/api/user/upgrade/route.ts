import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST() {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    // Simulação de upgrade para o plano PRO com 30 créditos
    const { data, error } = await supabase
      .from("users")
      .update({
        plan: "pro",
        credits_limit: 30,
        credits_used: 0 // Resetamos o uso para teste
      })
      .eq("id", session.user.id)
      .select()
      .single();

    if (error) {
      console.error("Erro ao atualizar plano no Supabase:", error);
      return NextResponse.json({ error: "Erro ao processar upgrade" }, { status: 500 });
    }

    return NextResponse.json({ 
      message: "Upgrade realizado com sucesso!", 
      user: {
        plan: data.plan,
        credits_limit: data.credits_limit,
        credits_used: data.credits_used
      }
    });
  } catch (err) {
    console.error("Erro interno no upgrade:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
