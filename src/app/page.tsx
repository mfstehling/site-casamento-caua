"use client";

import { Box, Button, Center, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { CountdownSection } from "@/components/organisms/CountdownSection";

export default function Home() {
  const router = useRouter();

  // #FCFAF3
  // #02340F

  return (
    <>
      <Box w="100%" h="100vh" position="relative" id="home">
        {/* Background */}
        <Image
          src="/background.jpg"
          alt="Background"
          objectFit="cover"
          w="100%"
          h="100%"
          position="absolute"
          zIndex={-1}
        />

        <Center w="100%" h="100%" flexDirection="column">
          <Text
            fontSize={["3xl", "5xl", "6xl"]}
            fontWeight="bold"
            color="teal.700"
            textAlign="center"
          >
            Matheus & Thais
          </Text>
          <Text
            mt={2}
            fontSize={["md", "lg", "xl"]}
            color="gray.700"
            textAlign="center"
          >
            22/05/2027
          </Text>

          <Button
            mt={6}
            colorScheme="teal"
            size="lg"
            onClick={() => router.push("/presentes")}
          >
            Lista de Presentes
          </Button>
        </Center>
      </Box>
      <CountdownSection id="contagem" />
    </>
  );
}
