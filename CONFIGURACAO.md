# Configuração do Site de Casamento

## Funcionalidades Implementadas

✅ Página inicial com design elegante
✅ Formulário de confirmação de presença com múltiplos convidados
✅ Lista de presentes com produtos do Mercado Livre
✅ Checkout com PIX
✅ Envio de emails automáticos

## Configuração de Email

Para que os emails funcionem, você precisa configurar as variáveis de ambiente:

### 1. Criar arquivo .env.local

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```
EMAIL_USER=casamentolaisecaua@gmail.com
EMAIL_PASSWORD=sua-senha-de-app
```

### 2. Gerar Senha de Aplicativo no Gmail

1. Acesse https://myaccount.google.com/apppasswords
2. Faça login com a conta casamentolaisecaua@gmail.com
3. Dê um nome para o aplicativo (ex: "Site Casamento")
4. Clique em "Criar"
5. Copie a senha de 16 caracteres gerada
6. Cole essa senha no campo `EMAIL_PASSWORD` do arquivo `.env.local`

**Importante:** Não use a senha normal da conta do Gmail. Use apenas a senha de aplicativo.

### 3. Verificar se 2FA está ativado

A geração de senhas de aplicativo só funciona se a verificação em duas etapas estiver ativada:
- Acesse: https://myaccount.google.com/security
- Procure por "Verificação em duas etapas"
- Se não estiver ativada, ative primeiro

## Personalização

### Alterar Chave PIX

Edite o arquivo `src/app/checkout/page.tsx`:

```typescript
// Linha ~28
const chavePix = "casamentolaisecaua@gmail.com"; // Altere aqui
```

### Alterar Email de Destino

Os emails são enviados para `casamentolaisecaua@gmail.com`. Para alterar:

1. **Confirmação de Presença**: Edite `src/app/api/confirmar-presenca/route.ts` linha ~31
2. **Notificação de PIX**: Edite `src/app/api/notificar-pix/route.ts` linha ~19

### Adicionar/Remover Produtos

Edite o arquivo `src/app/presentes/page.tsx` e modifique o array `produtos` (linha ~29).

Exemplo:
```typescript
{
  id: 13,
  nome: "Nome do Produto",
  preco: 99.90,
  imagem: "https://link-da-imagem.com/imagem.jpg",
  categoria: "Categoria",
}
```

## Executar o Projeto

```bash
npm run dev
```

O site estará disponível em: http://localhost:3000

## Páginas Criadas

- `/` - Página inicial
- `/confirmar-presenca` - Formulário de confirmação
- `/presentes` - Lista de presentes
- `/checkout` - Checkout com PIX

## Fluxo de Funcionamento

1. **Visitante** acessa a página inicial e clica em "Confirmar Presença"
2. **Confirmação**: Preenche o formulário e confirma (email é enviado)
3. **Redirecionamento**: Vai para a lista de presentes automaticamente
4. **Escolha**: Seleciona um presente
5. **Checkout**: Vê os detalhes do PIX e faz o pagamento
6. **Notificação**: Clica em "PIX Feito" e você recebe um email

## Dicas

- Teste o envio de emails antes de colocar o site no ar
- Mantenha o arquivo `.env.local` em segredo (não commite no git)
- As imagens dos produtos vêm do Mercado Livre (podem mudar)
- Para produção, use um serviço de email profissional como Resend ou SendGrid
