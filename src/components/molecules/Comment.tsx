import { Text } from "@chakra-ui/react";

export const Comment = ({ text }: { text: string }) => {
  return (
    <Text
      fontSize={["sm", "md"]}
      color="#02340F"
      fontStyle="italic"
      textAlign="center"
      maxW="600px"
    >
      {text}
    </Text>
  );
};
