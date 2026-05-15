import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, code: string) {
  try {
    await resend.emails.send({
      from: "CVMatch.AI <onboarding@resend.dev>", // Quando você tiver domínio, troque aqui
      to: email,
      subject: "Seu código de confirmação - CVMatch.AI",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h1 style="color: #00C897; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Bem-vindo ao CVMatch.AI!</h1>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Obrigado por se cadastrar. Use o código abaixo para confirmar sua conta e começar a gerar currículos otimizados:
          </p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #111827;">${code}</span>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Este código expira em 30 minutos. Se você não solicitou este e-mail, por favor ignore-o.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail de verificação:", error);
  }
}

export async function sendPasswordResetEmail(email: string, code: string) {
  try {
    await resend.emails.send({
      from: "CVMatch.AI <onboarding@resend.dev>",
      to: email,
      subject: "Recuperação de Senha - CVMatch.AI",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h1 style="color: #00C897; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Recuperação de Senha</h1>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Recebemos uma solicitação para resetar sua senha. Use o código abaixo para prosseguir:
          </p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #111827;">${code}</span>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Este código expira em 15 minutos. Se você não solicitou a alteração de senha, ignore este e-mail e sua senha permanecerá a mesma.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail de recuperação:", error);
  }
}
