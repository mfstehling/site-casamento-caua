import { NextResponse } from "next/server";

// Versão temporária SEM envio de email para testes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { convidadoDe, convidados } = body;

    // Apenas loga no console ao invés de enviar email
    console.log("=".repeat(50));
    console.log("📋 CONFIRMAÇÃO DE PRESENÇA RECEBIDA");
    console.log("=".repeat(50));
    console.log(`Convidado(a) de: ${convidadoDe === "lais" ? "Laís" : "Cauã"}`);
    console.log("\nConvidados confirmados:");
    convidados.forEach((c: { nome: string }, index: number) => {
      console.log(`  ${index + 1}. ${c.nome}`);
    });
    console.log("=".repeat(50));

    return NextResponse.json(
      { message: "Confirmação recebida com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erro:", error);
    return NextResponse.json(
      { error: "Erro ao processar confirmação" },
      { status: 500 }
    );
  }
}
