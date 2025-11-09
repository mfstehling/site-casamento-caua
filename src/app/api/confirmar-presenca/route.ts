import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { convidadoDe, convidados } = body;

    console.log("📧 Tentando enviar email...");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "***configurada***" : "NÃO CONFIGURADA");

    // Configurar o transporter do nodemailer
    // Para produção, use variáveis de ambiente
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "seu-email@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "sua-senha-de-app",
      },
    });

    // Preparar lista de nomes
    const listaConvidados = convidados
      .map((c: { nome: string }, index: number) => `${index + 1}. ${c.nome}`)
      .join("\n");

    // Enviar email
    console.log("📨 Enviando email para: casamentolaisecaua@gmail.com");
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "seu-email@gmail.com",
      to: "casamentolaisecaua@gmail.com",
      subject: `Nova Confirmação de Presença - Convidado${convidados.length > 1 ? "s" : ""} da ${convidadoDe === "lais" ? "Laís" : "Cauã"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #2C7A7B; text-align: center; margin-bottom: 30px;">
              Nova Confirmação de Presença
            </h1>

            <div style="background-color: #E6FFFA; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #234E52; font-size: 16px;">
                <strong>Convidado(a) de:</strong> ${convidadoDe === "lais" ? "Laís" : "Cauã"}
              </p>
            </div>

            <h2 style="color: #2C7A7B; font-size: 18px; margin-bottom: 15px;">
              ${convidados.length > 1 ? "Convidados confirmados:" : "Convidado confirmado:"}
            </h2>

            <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; border-left: 4px solid #2C7A7B;">
              <p style="white-space: pre-line; margin: 0; color: #2D3748; font-size: 16px; line-height: 1.8;">
                ${listaConvidados}
              </p>
            </div>

            <p style="color: #718096; font-size: 14px; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
              Esta confirmação foi enviada automaticamente através do site do casamento.
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ Email enviado com sucesso!");
    return NextResponse.json(
      { message: "Confirmação enviada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return NextResponse.json(
      {
        error: "Erro ao enviar confirmação",
        details: error instanceof Error ? error.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}
