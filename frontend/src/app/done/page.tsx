"use client";

import { Suspense } from "react";
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
import { useSearchParams, useRouter } from "next/navigation";

function DoneContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const groupId = searchParams.get("id");
  const groupUrl = groupId ? `${window.location.origin}/group/${groupId}` : "";

  const fontSize = useBreakpointValue({ base: "2xl", md: "3xl" });
  const inputSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const { hasCopied, onCopy } = useClipboard(groupUrl);

  const handleGroupPageNavigation = () => {
    if (groupId) {
      router.push(`/group/${groupId}`);
    }
  };

  return (
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
        グループページのURLをコピーして、LINEなどでメンバーに共有しましょう。
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
                icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
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
          onClick={handleGroupPageNavigation}
        >
          グループページへ進む
        </Button>
      </Stack>
    </Flex>
  );
}

export default function GroupCreated() {
  return (
    <Flex direction="column" minH="100vh" bg="#FFF8F8">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <DoneContent />
      </Suspense>
    </Flex>
  );
}
