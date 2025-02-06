import { Box, Button, Text, Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="linear-gradient(to bottom, #87CEFA, #00BFFF)"
      h="100vh"
      textAlign="center"
    >
      <Box mb={6}>
        <Text fontSize="6xl" fontWeight="bold" color="white">
          キニナルクリップ
        </Text>
      </Box>
      <Box mb={4}>
        <Text fontSize="xl" color="white">
          行きたい場所・飲食店・ホテル
          <br />
          あなたの“気になる”を共有しよう。
        </Text>
      </Box>
      <Box mb={8}>
        <Text fontSize="md" color="white">
          キニナルクリップは、行きたい場所や気になっている場所を
          <br />
          まとめて他のユーザーに共有できるサービスです。
        </Text>
      </Box>
      <Button colorScheme="blackAlpha" size="lg">
        はじめる
      </Button>
    </Flex>
  );
}
