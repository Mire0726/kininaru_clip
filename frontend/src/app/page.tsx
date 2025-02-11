"use client";

import {
  Box,
  Button,
  Image,
  Text,
  Flex,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const imageSize = useBreakpointValue({ base: 200, md: 335 });
  const spacing = useBreakpointValue({ base: 8, md: 100 });
  const fontSize = useBreakpointValue({ base: "4xl", md: "6xl" });
  const router = useRouter();
  const handleClick = () => {
    router.push("/new");
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="linear-gradient(to bottom, #87CEFA, #00BFFF)"
      minH="100vh"
      p={4}
      textAlign="center"
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={spacing}
        align="center"
        w="full"
        maxW="1200px"
        mb={4}
      >
        <Box flex={1}>
          <Box mb={{ base: 4, md: 6 }}>
            <Text fontSize={fontSize} fontWeight="bold" color="white">
              キニナル
              <br />
              クリップ
            </Text>
          </Box>
          <Box mb={{ base: 3, md: 4 }}>
            <Text fontSize={{ base: "lg", md: "xl" }} color="white">
              行きたい場所・飲食店・ホテル
              <br />
              あなたの"気になる"を共有しよう。
            </Text>
          </Box>
          <Box mb={{ base: 6, md: 8 }}>
            <Text fontSize={{ base: "sm", md: "md" }} color="white">
              キニナルクリップは、行きたい場所や気になっている場所を
              <br />
              まとめて他のユーザーに共有できるサービスです。
            </Text>
          </Box>
          <Button
            colorScheme="blackAlpha"
            size={{ base: "md", md: "lg" }}
            onClick={handleClick}
          >
            はじめる
          </Button>
        </Box>
        <Box flex={1}>
          <Image
            src="/icon.svg"
            alt="キニナルクリップ アイコン"
            width={imageSize}
            height={imageSize}
          />
        </Box>
      </Stack>
    </Flex>
  );
}
