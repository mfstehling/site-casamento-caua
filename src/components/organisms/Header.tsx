"use client";

import {
  Flex,
  HStack,
  Button,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <Flex
      w="100%"
      px={8}
      py={4}
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      top={0}
      zIndex={10}
      bg="#FCFAF3"
      opacity={0.8}
      backdropFilter="blur(10px)"
    >
      {/* Logo */}

      <Image src="/logo.jpg" alt="Logo" w="100px" h="50px" objectFit="cover" />

      {/* Menu */}
      <HStack spacing={8}>
        <ChakraLink href="#home">
          <Button variant="link">Home</Button>
        </ChakraLink>
        <ChakraLink href="#contagem">
          <Button variant="link">Contagem Regressiva</Button>
        </ChakraLink>
        <Button variant="link" onClick={() => router.push("/presentes")}>
          Presentes
        </Button>
        <Button
          variant="link"
          onClick={() => router.push("/confirmar-presenca")}
        >
          Confirmar Presença
        </Button>
      </HStack>
    </Flex>
  );
};
