import { NextResponse } from "next/server";

// Versão temporária SEM envio de email para testes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nomeDoador, produto } = body;

    // Apenas loga no console ao invés de enviar email
    console.log("=".repeat(50));
    console.log("💰 PRESENTE RECEBIDO VIA PIX");
    console.log("=".repeat(50));
    console.log(`Doador: ${nomeDoador}`);
    console.log(`Produto: ${produto.nome}`);
    console.log(`Categoria: ${produto.categoria}`);
    console.log(`Valor: R$ ${produto.preco.toFixed(2)}`);
    console.log("=".repeat(50));

    return NextResponse.json(
      { message: "Notificação recebida com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erro:", error);
    return NextResponse.json(
      { error: "Erro ao processar notificação" },
      { status: 500 }
    );
  }
}
