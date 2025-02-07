"use client";

import {
  Box,
  Button,
  Input,
  FormControl,
  Text,
  Flex,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
  useClipboard,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import Header from "../../components/header";

export default function GroupCreated() {
  const fontSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const inputSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

  const groupUrl = "https://example.com/group/123";
  const { hasCopied, onCopy } = useClipboard(groupUrl);

  return (
    <Flex direction="column" minH="100vh" bg="#FFF8F8">
      <Header />
      <Flex direction="column" align="center" justify="center" mt={10} px={4}>
        <Text fontSize={fontSize} fontWeight="bold" color="#46B2FF" mb={6}>
          グループを作成しました！
        </Text>

        <Box
          w={16}
          h={16}
          borderRadius="full"
          bg="#46B2FF"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={6}
        >
          <CheckIcon boxSize={8} color="white" />
        </Box>

        <Text fontSize="md" mb={4} textAlign="center">
          まずはグループページのURLをコピーして、  
          LINEなどでメンバーに共有しましょう。
        </Text>

        <Stack spacing={4} w="full" maxW="500px">
          <FormControl>
            <InputGroup>
              <Input
                value={groupUrl}
                isReadOnly
                size={inputSize}
                bg="white"
                border="1px solid #DADADA"
              />
              <InputRightElement>
                <IconButton
                  aria-label="Copy URL"
                  icon={<CopyIcon />}
                  onClick={onCopy}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            mt={4}
            size={buttonSize}
            bg="#46B2FF"
            color="white"
            borderRadius="md"
            boxShadow="md"
            _hover={{ bg: "#3A9CEB" }}
            onClick={() => window.location.href = groupUrl}
          >
            グループページへ進む
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
