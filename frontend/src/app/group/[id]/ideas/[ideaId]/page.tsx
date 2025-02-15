"use client";
import { useState } from "react";
import { useEffect } from "react";
import { use } from "react";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { useFetchIdea } from "@/hooks/useFetchIdea";
import { useUpdateIdea } from "@/hooks/useUpdateIdea";
import { SubHeader } from "@/components/SubHeader";
import Header from "@/components/header";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import {
  Button,
  Flex,
  Text,
  Icon,
  Box,
  Heading,
  Divider,
  Link,
  Input,
} from "@chakra-ui/react";
import {
  FaUtensils,
  FaHotel,
  FaMapMarkerAlt,
  FaStar,
  FaEdit,
} from "react-icons/fa";
import { useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface Props {
  params: Promise<{ id: string; ideaId: string }>;
}
export default function IdeaList({ params }: Props) {
  const toast = useToast();
  const resolvedParams = use(params);
  const queryClient = useQueryClient();
  const eventId = resolvedParams.id;
  const ideaId = resolvedParams.ideaId;
  const { fetchUsers: users } = useFetchUsers(eventId);
  const { fetchEvent: event } = useFetchEvent(eventId);
  const { fetchIdea: idea } = useFetchIdea(eventId, ideaId);
  const { mutate } = useUpdateIdea();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(idea?.title || "");
  const [editedMemo, setEditedMemo] = useState(idea?.memo || "");
  useEffect(() => {
    if (idea) {
      setEditedTitle(idea.title || "");
      setEditedMemo(idea.memo || "");
    }
  }, [idea]);

  const handleCancel = () => {
    setIsEditing(false);
    if (idea) {
      setEditedTitle(idea.title || "");
      setEditedMemo(idea.memo || "");
    }
  };
  const handleUpdate = () => {
    mutate(
      {
        params: {
          eventId: eventId,
          ideaId: ideaId,
        },
        requestBody: {
          title: editedTitle,
          memo: editedMemo,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          queryClient.invalidateQueries({
            queryKey: ["idea", eventId, ideaId],
          });
        },
        onError: (error) => {
          console.error("更新エラー:", error);
          toast({
            title: "エラー",
            description: "アイデアの更新に失敗しました",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  const getIconByTag = (tag: string | undefined) => {
    switch (tag) {
      case "restaurant":
        return FaUtensils;
      case "hotel":
        return FaHotel;
      case "location":
        return FaMapMarkerAlt;
      default:
        return FaStar;
    }
  };

  const boxWidth = useBreakpointValue({ base: "90%", md: "600px" });
  const boxPadding = useBreakpointValue({ base: 4, md: 6 });

  return (
    <Flex direction="column" minH="100vh" bg="#FFF8F8">
      <Header />
      <Flex px={4} mt={4}>
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          color="#46B2FF"
          onClick={() => router.back()}
          size={useBreakpointValue({ base: "sm", md: "md" })}
        >
          戻る
        </Button>
      </Flex>
      <SubHeader title={event?.title} users={users} />
      <Box
        w="full"
        maxW={boxWidth}
        bg="white"
        mt={6}
        p={boxPadding}
        borderRadius="lg"
        boxShadow="md"
        mx="auto"
        position="relative"
      >
        <Icon
          as={FaEdit}
          cursor="pointer"
          onClick={() => setIsEditing(true)}
          position="absolute"
          top={4}
          right={4}
          color="#46B2FF"
          boxSize={5}
        />

        <Flex align="center" gap={2} color="#46B2FF">
          <Icon as={getIconByTag(idea?.tag)} boxSize={6} />
        </Flex>

        <Flex align="center" gap={2}>
          {isEditing ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <Heading size="lg" mt={2}>
              {idea?.title}
            </Heading>
          )}
        </Flex>

        <Text fontSize="sm" color="gray.600" mt={1}>
          {idea?.created_by_name}
        </Text>
        <Divider my={4} />

        <Flex direction="column" gap={2}>
          <Text fontSize="md" fontWeight="bold">
            memo:
          </Text>
          {isEditing ? (
            <Textarea
              value={editedMemo}
              onChange={(e) => setEditedMemo(e.target.value)}
              resize="vertical"
              minH="100px"
            />
          ) : (
            <Text whiteSpace="pre-wrap" wordBreak="break-word">
              {idea?.memo}
            </Text>
          )}
        </Flex>

        <Box h="40px" borderBottom="1px solid #46B2FF" />

        <Flex direction="column" gap={2} mt={4}>
          <Text fontSize="md" fontWeight="bold">
            Google Maps URL：
          </Text>
          <Link
            href={idea?.url}
            color="blue.500"
            isExternal
            wordBreak="break-all"
            overflowWrap="break-word"
          >
            {idea?.url}
          </Link>
        </Flex>

        {isEditing && (
          <Flex gap={2} mt={4}>
            <Button colorScheme="blue" onClick={handleUpdate}>
              保存
            </Button>
            <Button variant="ghost" onClick={handleCancel}>
              キャンセル
            </Button>
          </Flex>
        )}
        <Button
          mt={6}
          w="full"
          bg="white"
          border="1px solid #46B2FF"
          color="#46B2FF"
          _hover={{ bg: "#46B2FF", color: "white" }}
          borderRadius="md"
        >
          AI提案機能を利用する
        </Button>
      </Box>
    </Flex>
  );
}
