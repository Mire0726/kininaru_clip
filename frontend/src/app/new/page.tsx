"use client";

import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Header from "../../components/header";
export default function NewGroup() {
  const fontSize = useBreakpointValue({ base: "3xl", md: "4xl" });
  const inputSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Flex direction="column" minH="100vh" bg="#FFF8F8">
      <Header />
      <Flex direction="column" align="center" mt={10} px={4}>
        <Text fontSize={fontSize} fontWeight="bold" color="#46B2FF" mb={6}>
          グループ作成
        </Text>

        <Stack spacing={4} w="full" maxW="500px">
          <FormControl>
            <FormLabel fontSize="lg">タイトル</FormLabel>
            <Input placeholder="九州旅行" size={inputSize} bg="white" />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="lg">メンバー名</FormLabel>
            <Input placeholder="すみれ" size={inputSize} bg="white" />
          </FormControl>

          <Button
            mt={6}
            size={buttonSize}
            bg="white"
            color="#46B2FF"
            border="1px solid #DADADA"
            boxShadow="md"
            _hover={{ bg: "#f0f0f0" }}
          >
            作成
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
