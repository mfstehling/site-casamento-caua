"use client";

import {
  Box,
  Button,
  Center,
  Grid,
  Image,
  Text,
  VStack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
}

export default function Presentes() {
  const router = useRouter();
  const cardBg = useColorModeValue("white", "gray.800");

  // Lista de produtos essenciais para recém-casados
  const produtos: Produto[] = [
    {
      id: 1,
      nome: "Jogo de Panelas Antiaderente",
      preco: 299.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_942838-MLB75526859398_042024-F.webp",
      categoria: "Cozinha",
    },
    {
      id: 2,
      nome: "Jogo de Cama Casal",
      preco: 149.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_949119-MLB75098721890_032024-F.webp",
      categoria: "Quarto",
    },
    {
      id: 3,
      nome: "Cafeteira Elétrica",
      preco: 189.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_625234-MLB69812821766_062023-F.webp",
      categoria: "Cozinha",
    },
    {
      id: 4,
      nome: "Aparelho de Jantar 20 Peças",
      preco: 249.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_774736-MLB74688775866_022024-F.webp",
      categoria: "Cozinha",
    },
    {
      id: 5,
      nome: "Liquidificador",
      preco: 159.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_895133-MLB74476913156_022024-F.webp",
      categoria: "Cozinha",
    },
    {
      id: 6,
      nome: "Ferro de Passar a Vapor",
      preco: 129.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_777384-MLB74426664893_022024-F.webp",
      categoria: "Lavanderia",
    },
    {
      id: 7,
      nome: "Conjunto de Toalhas",
      preco: 99.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_928957-MLB74866374039_032024-F.webp",
      categoria: "Banho",
    },
    {
      id: 8,
      nome: "Aspirador de Pó",
      preco: 199.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_945769-MLB74854729875_032024-F.webp",
      categoria: "Limpeza",
    },
    {
      id: 9,
      nome: "Micro-ondas",
      preco: 449.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_647656-MLB74795885766_032024-F.webp",
      categoria: "Cozinha",
    },
    {
      id: 10,
      nome: "Jogo de Copos",
      preco: 79.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_687824-MLB71347901528_092023-F.webp",
      categoria: "Cozinha",
    },
    {
      id: 11,
      nome: "Ventilador de Mesa",
      preco: 139.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_826665-MLB74845664629_032024-F.webp",
      categoria: "Conforto",
    },
    {
      id: 12,
      nome: "Conjunto de Facas",
      preco: 119.90,
      imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_862838-MLB74654935154_022024-F.webp",
      categoria: "Cozinha",
    },
  ];

  const handleProdutoClick = (produto: Produto) => {
    router.push(`/checkout?produto=${encodeURIComponent(JSON.stringify(produto))}`);
  };

  return (
    <Box w="100%" minH="100vh" bg="#FCFAF3" py={20} px={[4, 6, 8]}>
      <VStack spacing={8} maxW="1400px" mx="auto">
        <VStack spacing={4}>
          <Text
            fontSize={["3xl", "4xl", "5xl"]}
            fontWeight="bold"
            color="teal.700"
            textAlign="center"
          >
            Lista de Presentes
          </Text>

          <Text
            fontSize="lg"
            color="gray.600"
            textAlign="center"
            maxW="700px"
            px={4}
          >
            Sua contribuição é muito importante para começarmos nossa nova vida
            juntos. Escolha um presente e nos ajude a montar nosso lar!
          </Text>
        </VStack>

        <Grid
          templateColumns={[
            "1fr",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap={6}
          w="100%"
        >
          {produtos.map((produto) => (
            <Box
              key={produto.id}
              bg={cardBg}
              borderRadius="xl"
              overflow="hidden"
              boxShadow="lg"
              transition="all 0.3s"
              cursor="pointer"
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: "2xl",
              }}
              onClick={() => handleProdutoClick(produto)}
            >
              <Box position="relative" h="250px" overflow="hidden">
                <Image
                  src={produto.imagem}
                  alt={produto.nome}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
                <Badge
                  position="absolute"
                  top={3}
                  right={3}
                  colorScheme="teal"
                  fontSize="sm"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {produto.categoria}
                </Badge>
              </Box>

              <VStack p={5} spacing={3} align="stretch">
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="gray.700"
                  minH="50px"
                >
                  {produto.nome}
                </Text>

                <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                  R$ {produto.preco.toFixed(2)}
                </Text>

                <Button
                  colorScheme="teal"
                  size="md"
                  w="100%"
                  onClick={() => handleProdutoClick(produto)}
                >
                  Presentear
                </Button>
              </VStack>
            </Box>
          ))}
        </Grid>

        <Box textAlign="center" mt={8} p={6} bg="teal.50" borderRadius="xl">
          <Text color="gray.700" fontSize="md">
            Todos os valores serão recebidos via PIX e usados para adquirir os
            produtos desejados.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
