import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data: profile, error } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_id", session.user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Erro ao buscar perfil:", error);
    return NextResponse.json({ error: "Erro ao carregar perfil" }, { status: 500 });
  }

  return NextResponse.json({ profile: profile || {} });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { hard_skills, soft_skills, experiences, education, languages, certifications } = await request.json();
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("user_profile")
      .upsert({
        user_id: session.user.id,
        hard_skills: hard_skills || [],
        soft_skills: soft_skills || [],
        experiences: experiences || [],
        education: education || [],
        languages: languages || [],
        certifications: certifications || [],
        last_updated: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      console.error("Erro ao salvar perfil:", error);
      return NextResponse.json({ error: "Erro ao salvar alterações" }, { status: 500 });
    }

    return NextResponse.json({ success: true, profile: data });
  } catch (err) {
    console.error("Erro interno no perfil:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
