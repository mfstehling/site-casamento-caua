"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TimeBox } from "../molecules/TimeBox";
import { Patrick_Hand } from "next/font/google";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});

export const CountdownSection = ({ id }: { id: string }) => {
  const weddingDate = new Date("2026-03-21T00:00:00");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +weddingDate - +new Date();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const comments = [
    "Faltam só alguns dias! 🥳 - Mãe do noivo",
    "O grande dia está chegando! 💖 - Mãe da noiva",
    "Mal podemos esperar por esse momento! ✨ - Pai do noivo",
    "Já estamos na contagem regressiva! 🎉 - Pai da noiva",
    "Ansiosos por viver esse dia incrível! 💍 - Irmão mais bonito",
    "Contagem regressiva ativada! 🎊 - Cunhada mais linda",
  ];

  return (
    <Box
      id={id}
      w="100%"
      minH="100vh"
      bg="#FCFAF3"
      py={16}
      px={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      <Text
        fontSize={["3xl", "4xl", "5xl"]}
        fontWeight="bold"
        color="#02340F"
        mb={10}
        textAlign="center"
      >
        Contagem Regressiva
      </Text>

      {/* Relógio */}
      <Flex gap={[4, 8]} wrap="wrap" justify="center">
        <TimeBox label="Dias" value={timeLeft.days} />
        <TimeBox label="Horas" value={timeLeft.hours} />
        <TimeBox label="Minutos" value={timeLeft.minutes} />
        <TimeBox label="Segundos" value={timeLeft.seconds} />
      </Flex>

      {/* Comentários distribuídos */}
      <Box w="100%" h="400px" mt={16}>
        {comments.map((comment, index) => {
          const positions = [
            { top: "15%", left: "5%", rotate: "-10deg" },
            { top: "15%", left: "80%", rotate: "10deg" },
            { top: "45%", left: "15%", rotate: "-10deg" },
            { top: "55%", left: "60%", rotate: "10deg" },
            { top: "65%", left: "40%", rotate: "-10deg" },
            { top: "50%", left: "85%", rotate: "10deg" },
          ];

          const pos = positions[index % positions.length];

          return (
            <Text
              key={index}
              className={patrickHand.className}
              position="absolute"
              top={pos.top}
              left={pos.left}
              transform={`rotate(${pos.rotate})`}
              color="#02340F"
              fontSize={["sm", "4xl"]}
              fontStyle="italic"
              textAlign="center"
              maxW="200px"
            >
              {comment}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
};
