import { Box, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box bg="#46B2FF" py={4} textAlign="center">
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        color="white"
      >
        キニナルクリップ
      </Text>
    </Box>
  );
}
