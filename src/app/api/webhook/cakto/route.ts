import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret, event, data } = body;

    // 1. Validar o segredo do Webhook
    if (secret !== process.env.CAKTO_WEBHOOK_SECRET) {
      console.error("Webhook Cakto: Segredo inválido!");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Recebido evento da Cakto: ${event}`, data);

    // 2. Processar apenas compras aprovadas
    if (event === "purchase_approved") {
      const email = data.customer?.email;
      const offerId = data.offer?.id;

      if (!email || !offerId) {
        return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
      }

      // Mapear qual plano e quantos créditos liberar
      let plan = "free";
      let creditsLimit = 2;

      // Lista de IDs das ofertas do .env
      const proOffers = [
        process.env.CAKTO_OFFER_PRO_MONTHLY,
        process.env.CAKTO_OFFER_PRO_QUARTERLY,
        process.env.CAKTO_OFFER_PRO_ANNUAL
      ];

      const premiumOffers = [
        process.env.CAKTO_OFFER_PREMIUM_MONTHLY,
        process.env.CAKTO_OFFER_PREMIUM_QUARTERLY,
        process.env.CAKTO_OFFER_PREMIUM_ANNUAL
      ];

      if (proOffers.includes(offerId)) {
        plan = "Pro";
        creditsLimit = 25;
      } else if (premiumOffers.includes(offerId)) {
        plan = "Premium";
        creditsLimit = 200;
      } else {
        console.warn(`Webhook Cakto: Oferta ${offerId} não mapeada!`);
        return NextResponse.json({ message: "Oferta não mapeada" }, { status: 200 });
      }

      const supabase = getSupabaseAdmin();

      // Atualizar o usuário no banco de dados
      const { error: updateError } = await supabase
        .from("users")
        .update({
          plan: plan,
          credits_limit: creditsLimit,
          credits_used: 0 // Reseta os créditos no momento da compra/renovação
        })
        .eq("email", email);

      if (updateError) {
        console.error("Erro ao atualizar plano via Webhook:", updateError);
        return NextResponse.json({ error: "Erro interno ao atualizar usuário" }, { status: 500 });
      }

      console.log(`Sucesso: Plano ${plan} ativado para ${email}`);
    }

    // Responder 200 OK para a Cakto
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Erro no processamento do Webhook Cakto:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
