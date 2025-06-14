"use client";

import { Center, Text, VStack } from "@chakra-ui/react";
// import { useRouter } from "next/navigation";

export default function Presentes() {
  // const router = useRouter();

  return (
    <Center w="100%" h="100vh" flexDirection="column" bg="#FCFAF3">
      <VStack spacing={6}>
        <Text
          fontSize={["3xl", "4xl", "5xl"]}
          fontWeight="bold"
          color="teal.700"
        >
          Lista de Presentes
        </Text>

        <Text fontSize="lg" color="gray.600" textAlign="center" maxW="600px">
          Aqui você pode escolher um presente especial para nos ajudar a
          construir nosso futuro juntos. ❤️
        </Text>

        {}
      </VStack>
    </Center>
  );
}
