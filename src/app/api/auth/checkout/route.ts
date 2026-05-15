import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: "Você precisa estar logado para assinar um plano." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const plan = searchParams.get("plan"); // 'pro' | 'premium'
  const period = searchParams.get("period"); // 'monthly' | 'quarterly' | 'annual'

  if (!plan || !period) {
    return NextResponse.json({ error: "Plano e período são obrigatórios." }, { status: 400 });
  }

  // Mapeamento dos IDs das ofertas conforme o .env
  const offerKeys: Record<string, string | undefined> = {
    "pro_monthly": process.env.CAKTO_OFFER_PRO_MONTHLY,
    "pro_quarterly": process.env.CAKTO_OFFER_PRO_QUARTERLY,
    "pro_annual": process.env.CAKTO_OFFER_PRO_ANNUAL,
    "premium_monthly": process.env.CAKTO_OFFER_PREMIUM_MONTHLY,
    "premium_quarterly": process.env.CAKTO_OFFER_PREMIUM_QUARTERLY,
    "premium_annual": process.env.CAKTO_OFFER_PREMIUM_ANNUAL,
  };

  const key = `${plan.toLowerCase()}_${period.toLowerCase()}`;
  const offerId = offerKeys[key];

  if (!offerId) {
    return NextResponse.json({ error: "Configuração do plano não encontrada." }, { status: 404 });
  }

  // Construir URL de checkout com pre-fill dos dados do usuário
  const baseUrl = `https://pay.cakto.com.br/${offerId}`;
  const checkoutUrl = new URL(baseUrl);
  
  if (session.user.email) checkoutUrl.searchParams.append("email", session.user.email);
  if (session.user.name) checkoutUrl.searchParams.append("name", session.user.name);
  
  // Adicionar SRC para rastreamento (opcional)
  checkoutUrl.searchParams.append("src", "cvmatch_app");

  return NextResponse.redirect(checkoutUrl.toString());
}
