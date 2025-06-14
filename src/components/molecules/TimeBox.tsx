import { Box, Text } from "@chakra-ui/react";

export const TimeBox = ({ label, value }: { label: string; value: number }) => {
  return (
    <Box
      bg="#02340F"
      color="#FCFAF3"
      borderRadius="lg"
      p={[4, 6]}
      minW={["70px", "100px"]}
      textAlign="center"
      boxShadow="lg"
    >
      <Text fontSize={["3xl", "4xl"]} fontWeight="bold">
        {String(value).padStart(2, "0")}
      </Text>
      <Text fontSize={["sm", "md"]} fontWeight="medium">
        {label}
      </Text>
    </Box>
  );
};
