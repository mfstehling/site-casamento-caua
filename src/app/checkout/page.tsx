"use client";

import {
  Box,
  Button,
  Center,
  Text,
  VStack,
  Image,
  HStack,
  Divider,
  useToast,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [nomeDoador, setNomeDoador] = useState("");
  const [loading, setLoading] = useState(false);
  const [pixCopiado, setPixCopiado] = useState(false);

  // Chave PIX (substitua pela sua)
  const chavePix = "casamentolaisecaua@gmail.com";

  useEffect(() => {
    const produtoParam = searchParams.get("produto");
    if (produtoParam) {
      try {
        const produtoData = JSON.parse(decodeURIComponent(produtoParam));
        setProduto(produtoData);
      } catch (error) {
        console.error("Erro ao parsear produto:", error);
        router.push("/presentes");
      }
    } else {
      router.push("/presentes");
    }
  }, [searchParams, router]);

  const copiarChavePix = () => {
    navigator.clipboard.writeText(chavePix);
    setPixCopiado(true);
    toast({
      title: "Chave PIX copiada!",
      description: "Cole a chave no seu app de pagamento.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => setPixCopiado(false), 3000);
  };

  const handlePixFeito = async () => {
    if (!nomeDoador.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe seu nome.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!produto) return;

    setLoading(true);

    try {
      const response = await fetch("/api/notificar-pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeDoador,
          produto,
        }),
      });

      if (response.ok) {
        toast({
          title: "Obrigado!",
          description:
            "Recebemos a notificação do seu presente. Muito obrigado!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        throw new Error("Erro ao enviar notificação");
      }
    } catch {
      toast({
        title: "Erro ao enviar notificação",
        description: "Por favor, tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!produto) {
    return (
      <Center w="100%" h="100vh" bg="#FCFAF3">
        <Text fontSize="xl" color="gray.600">
          Carregando...
        </Text>
      </Center>
    );
  }

  return (
    <Center w="100%" minH="100vh" bg="#FCFAF3" py={20} px={4}>
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="2xl"
        p={[6, 8, 10]}
        maxW="700px"
        w="100%"
      >
        <VStack spacing={6}>
          <Text
            fontSize={["3xl", "4xl"]}
            fontWeight="bold"
            color="teal.700"
            textAlign="center"
          >
            Finalizar Presente
          </Text>

          <Box w="100%" bg="gray.50" p={6} borderRadius="xl">
            <HStack spacing={4} align="start">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                w="120px"
                h="120px"
                objectFit="cover"
                borderRadius="lg"
              />

              <VStack align="start" flex={1}>
                <Text fontSize="lg" fontWeight="bold" color="gray.700">
                  {produto.nome}
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                  R$ {produto.preco.toFixed(2)}
                </Text>
              </VStack>
            </HStack>
          </Box>

          <Divider />

          <Box w="100%">
            <Text fontSize="xl" fontWeight="bold" color="gray.700" mb={4}>
              Pagamento via PIX
            </Text>

            <VStack spacing={4} align="stretch">
              <Box bg="teal.50" p={5} borderRadius="lg" border="2px dashed" borderColor="teal.300">
                <VStack spacing={3}>
                  <Text fontSize="sm" color="gray.600" fontWeight="semibold">
                    Chave PIX (E-mail):
                  </Text>
                  <HStack w="100%">
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="teal.700"
                      textAlign="center"
                      flex={1}
                      wordBreak="break-all"
                    >
                      {chavePix}
                    </Text>
                  </HStack>
                  <Button
                    leftIcon={pixCopiado ? <CheckIcon /> : <CopyIcon />}
                    onClick={copiarChavePix}
                    colorScheme={pixCopiado ? "green" : "teal"}
                    size="md"
                    w="100%"
                  >
                    {pixCopiado ? "Copiado!" : "Copiar Chave PIX"}
                  </Button>
                </VStack>
              </Box>

              <Box bg="blue.50" p={4} borderRadius="lg">
                <Text fontSize="sm" color="blue.800" textAlign="center">
                  1. Copie a chave PIX acima
                  <br />
                  2. Abra seu app de banco
                  <br />
                  3. Faça o PIX no valor de R$ {produto.preco.toFixed(2)}
                  <br />
                  4. Volte aqui e clique em &quot;PIX Feito&quot;
                </Text>
              </Box>

              <FormControl isRequired>
                <FormLabel color="gray.700" fontWeight="semibold">
                  Seu Nome
                </FormLabel>
                <Input
                  placeholder="Digite seu nome completo"
                  value={nomeDoador}
                  onChange={(e) => setNomeDoador(e.target.value)}
                  size="lg"
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "teal.500",
                    bg: "white",
                  }}
                />
              </FormControl>

              <Button
                onClick={handlePixFeito}
                colorScheme="teal"
                size="lg"
                w="100%"
                fontSize="xl"
                py={6}
                isLoading={loading}
                loadingText="Enviando..."
              >
                PIX Feito
              </Button>

              <Button
                onClick={() => router.push("/presentes")}
                variant="outline"
                colorScheme="gray"
                size="md"
                w="100%"
              >
                Voltar para Lista de Presentes
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={
      <Center w="100%" h="100vh" bg="#FCFAF3">
        <Text fontSize="xl" color="gray.600">
          Carregando...
        </Text>
      </Center>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
