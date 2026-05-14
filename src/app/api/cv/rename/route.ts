import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id, newTitle } = await request.json();

    if (!id || !newTitle) {
      return NextResponse.json({ error: "ID e novo título são obrigatórios" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("cv_history")
      .update({ job_title: newTitle })
      .eq("id", id)
      .eq("user_id", session.user.id); // Garantia extra de segurança

    if (error) {
      console.error("Erro ao renomear CV:", error);
      return NextResponse.json({ error: "Erro ao atualizar o nome" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "CV renomeado com sucesso!" });
  } catch (err) {
    console.error("Erro interno no rename:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
