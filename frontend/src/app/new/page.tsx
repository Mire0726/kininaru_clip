"use client";

import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { usePostEvent } from "../../hooks/usePostEvent";
import Header from "../../components/header";

export default function NewGroup() {
  const router = useRouter();
  const toast = useToast();
  const fontSize = useBreakpointValue({ base: "3xl", md: "4xl" });
  const inputSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

  const [title, setTitle] = useState("");
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const { mutate: createEvent, data, error } = usePostEvent();
  const handleAddMember = () => {
    if (memberName.trim() === "") return;
    setMembers([...members, memberName]);
    setMemberName("");
  };

  const handleRemoveMember = (name: string) => {
    setMembers(members.filter((member) => member !== name));
  };

  const handleCreateEvent = () => {
    if (!title || members.length === 0) {
      alert("タイトルとメンバー名を入力してください");
      return;
    }

    createEvent(
      {
        title,
        users: members.map((name) => ({ name })),
      },
      {
        onSuccess: (data) => {
          router.push(`/done?id=${encodeURIComponent(data.id)}`);
        },
        onError: () => {
          console.log(members.map((name) => ({ name })));
          toast({
            title: "エラー",
            description: "グループの作成に失敗しました",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };
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
            <Input
              placeholder="九州旅行"
              size={inputSize}
              bg="white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="lg">メンバー名</FormLabel>
            <Flex>
              <Input
                placeholder="すみれ"
                size={inputSize}
                bg="white"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
              <Button
                ml={2}
                size="md"
                colorScheme="blue"
                onClick={handleAddMember}
              >
                追加
              </Button>
            </Flex>
          </FormControl>

          <Flex wrap="wrap" gap={2}>
            {members.map((name) => (
              <Tag key={name} size="lg" colorScheme="blue">
                <TagLabel>{name}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveMember(name)} />
              </Tag>
            ))}
          </Flex>

          <Button
            mt={6}
            size={buttonSize}
            bg="white"
            color="#46B2FF"
            border="1px solid #DADADA"
            boxShadow="md"
            _hover={{ bg: "#f0f0f0" }}
            onClick={handleCreateEvent}
          >
            作成
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
