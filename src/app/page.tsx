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
        {/* Background overlay for better text readability */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          bg="blackAlpha.300"
          zIndex={0}
        />

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

        <Center w="100%" h="100%" flexDirection="column" position="relative" zIndex={1} px={4}>
          <Box
            bg="whiteAlpha.900"
            backdropFilter="blur(10px)"
            borderRadius="2xl"
            p={[8, 10, 12]}
            boxShadow="2xl"
            textAlign="center"
            maxW="600px"
          >
            <Text
              fontSize={["4xl", "5xl", "6xl"]}
              fontWeight="bold"
              color="teal.700"
              fontFamily="serif"
              letterSpacing="wider"
            >
              Cauã & Laís
            </Text>

            <Box w="60px" h="1px" bg="teal.500" mx="auto" my={4} />

            <Text
              mt={4}
              fontSize={["xl", "2xl", "3xl"]}
              color="gray.700"
              fontWeight="medium"
            >
              22 de Maio de 2027
            </Text>

            <Text
              mt={4}
              fontSize={["md", "lg"]}
              color="gray.600"
              fontStyle="italic"
            >
              Celebre conosco este momento especial
            </Text>

            <Button
              mt={8}
              colorScheme="teal"
              size="lg"
              onClick={() => router.push("/confirmar-presenca")}
              px={10}
              py={6}
              fontSize="xl"
              borderRadius="full"
              boxShadow="lg"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              transition="all 0.3s"
            >
              Confirmar Presença
            </Button>
          </Box>
        </Center>
      </Box>
      <CountdownSection id="contagem" />
    </>
  );
}
