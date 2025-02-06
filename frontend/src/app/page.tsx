import { Box, Button, Image, Text, Flex, HStack } from "@chakra-ui/react";

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
      <HStack spacing={100} mb={4}>
        <Box>
          <Box mb={6}>
            <Text fontSize="6xl" fontWeight="bold" color="white">
              キニナル
              <br />
              クリップ
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
        </Box>
        <Box>
          <Image
            src="/icon.svg"
            alt="キニナルクリップ アイコン"
            width={335}
            height={335}
          />
        </Box>
      </HStack>
    </Flex>
  );
}
