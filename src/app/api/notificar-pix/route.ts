import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nomeDoador, produto } = body;

    // Configurar o transporter do nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "seu-email@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "sua-senha-de-app",
      },
    });

    // Enviar email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "seu-email@gmail.com",
      to: "casamentolaisecaua@gmail.com",
      subject: `Novo Presente Recebido - R$ ${produto.preco.toFixed(2)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #2C7A7B; text-align: center; margin-bottom: 30px;">
              Novo Presente Recebido via PIX!
            </h1>

            <div style="background-color: #E6FFFA; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0; color: #234E52; font-size: 18px;">
                <strong>Doador:</strong> ${nomeDoador}
              </p>
              <p style="margin: 0; color: #234E52; font-size: 24px; font-weight: bold;">
                <strong>Valor:</strong> R$ ${produto.preco.toFixed(2)}
              </p>
            </div>

            <h2 style="color: #2C7A7B; font-size: 18px; margin-bottom: 15px;">
              Produto Presenteado:
            </h2>

            <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; border-left: 4px solid #2C7A7B;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #2D3748;">
                    <strong>Produto:</strong>
                  </td>
                  <td style="padding: 10px 0; color: #2D3748;">
                    ${produto.nome}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #2D3748;">
                    <strong>Categoria:</strong>
                  </td>
                  <td style="padding: 10px 0; color: #2D3748;">
                    ${produto.categoria}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #2D3748;">
                    <strong>Valor:</strong>
                  </td>
                  <td style="padding: 10px 0; color: #2C7A7B; font-weight: bold; font-size: 18px;">
                    R$ ${produto.preco.toFixed(2)}
                  </td>
                </tr>
              </table>
            </div>

            <div style="background-color: #FFF5F5; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #F56565;">
              <p style="margin: 0; color: #742A2A; font-size: 14px;">
                <strong>Lembrete:</strong> Verifique sua conta bancária para confirmar o recebimento do PIX.
              </p>
            </div>

            <p style="color: #718096; font-size: 14px; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
              Esta notificação foi enviada automaticamente através do site do casamento.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Notificação enviada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { error: "Erro ao enviar notificação" },
      { status: 500 }
    );
  }
}
