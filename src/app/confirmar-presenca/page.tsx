"use client";

import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  useToast,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

interface Convidado {
  id: number;
  nome: string;
}

export default function ConfirmarPresenca() {
  const router = useRouter();
  const toast = useToast();
  const [convidadoDe, setConvidadoDe] = useState<"lais" | "caua">("lais");
  const [convidados, setConvidados] = useState<Convidado[]>([
    { id: 1, nome: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const adicionarConvidado = () => {
    const novoId = Math.max(...convidados.map((c) => c.id)) + 1;
    setConvidados([...convidados, { id: novoId, nome: "" }]);
  };

  const removerConvidado = (id: number) => {
    if (convidados.length > 1) {
      setConvidados(convidados.filter((c) => c.id !== id));
    }
  };

  const atualizarNomeConvidado = (id: number, nome: string) => {
    setConvidados(
      convidados.map((c) => (c.id === id ? { ...c, nome } : c))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    const nomesPreenchidos = convidados.filter((c) => c.nome.trim() !== "");
    if (nomesPreenchidos.length === 0) {
      toast({
        title: "Erro",
        description: "Por favor, preencha pelo menos um nome.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/confirmar-presenca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          convidadoDe,
          convidados: nomesPreenchidos,
        }),
      });

      if (response.ok) {
        toast({
          title: "Presença confirmada!",
          description: "Obrigado por confirmar. Aguardamos você!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Redirecionar para lista de presentes após 1.5s
        setTimeout(() => {
          router.push("/presentes");
        }, 1500);
      } else {
        throw new Error("Erro ao enviar confirmação");
      }
    } catch (error) {
      toast({
        title: "Erro ao confirmar presença",
        description: "Por favor, tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center w="100%" minH="100vh" bg="#FCFAF3" py={20} px={4}>
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="2xl"
        p={[6, 8, 10]}
        maxW="600px"
        w="100%"
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Text
            fontSize={["3xl", "4xl"]}
            fontWeight="bold"
            color="teal.700"
            textAlign="center"
          >
            Confirmar Presença
          </Text>

          <Text fontSize="md" color="gray.600" textAlign="center">
            Ficaremos muito felizes com a sua presença!
          </Text>

          <FormControl isRequired>
            <FormLabel color="gray.700" fontWeight="semibold">
              Você é convidado(a) de:
            </FormLabel>
            <RadioGroup onChange={(value) => setConvidadoDe(value as "lais" | "caua")} value={convidadoDe}>
              <Stack direction="row" spacing={6}>
                <Radio value="lais" colorScheme="teal">
                  Laís
                </Radio>
                <Radio value="caua" colorScheme="teal">
                  Cauã
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <Box w="100%">
            <Text color="gray.700" fontWeight="semibold" mb={3}>
              Nome(s) do(s) convidado(s):
            </Text>

            <VStack spacing={3} w="100%">
              {convidados.map((convidado, index) => (
                <HStack key={convidado.id} w="100%">
                  <FormControl isRequired={index === 0}>
                    <Input
                      placeholder={`Nome do ${index + 1}º convidado`}
                      value={convidado.nome}
                      onChange={(e) =>
                        atualizarNomeConvidado(convidado.id, e.target.value)
                      }
                      size="lg"
                      bg="gray.50"
                      borderColor="gray.300"
                      _focus={{
                        borderColor: "teal.500",
                        bg: "white",
                      }}
                    />
                  </FormControl>

                  {convidados.length > 1 && (
                    <IconButton
                      aria-label="Remover convidado"
                      icon={<CloseIcon />}
                      onClick={() => removerConvidado(convidado.id)}
                      colorScheme="red"
                      variant="outline"
                      size="lg"
                    />
                  )}
                </HStack>
              ))}
            </VStack>

            <Button
              mt={4}
              leftIcon={<AddIcon />}
              onClick={adicionarConvidado}
              variant="outline"
              colorScheme="teal"
              w="100%"
            >
              Confirmar mais uma pessoa
            </Button>
          </Box>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            w="100%"
            mt={4}
            isLoading={loading}
            loadingText="Enviando..."
            fontSize="xl"
            py={6}
          >
            Enviar Confirmação
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
