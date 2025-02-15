"use client";
import { useState } from "react";
import { useEffect } from "react";
import { use } from "react";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { useFetchIdea } from "@/hooks/useFetchIdea";
import { useUpdateIdea } from "@/hooks/useUpdateIdea";
import { useDeleteIdea } from "@/hooks/useDeleteIdea";
import { SubHeader } from "@/components/SubHeader";
import Header from "@/components/header";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchRecommend } from "@/hooks/useFetchRecommend";
import { useToast } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { FetchRecommendResponse } from "@/constants/type";

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
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowBackIcon } from "@chakra-ui/icons";
import RecommendSection from "./recommendSection";

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
  const { fetchRecommend: recommends, isLoading } = useFetchRecommend(
    eventId,
    ideaId
  );
  console.log("recommend", recommends);

  const { mutate } = useUpdateIdea();
  const { mutate: deleteIdea } = useDeleteIdea();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(idea?.title || "");
  const [editedMemo, setEditedMemo] = useState(idea?.memo || "");
  const [showRecommend, setShowRecommend] = useState(false);
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

  const handleDelete = async () => {
    try {
      await deleteIdea(
        { eventId, ideaId },
        {
          onSuccess: () => {
            toast({
              title: "削除成功",
              status: "success",
              duration: 3000,
            });
            router.push(`/group/${eventId}`);
          },
          onError: (error) => {
            toast({
              title: "削除エラー",
              description: error.message,
              status: "error",
              duration: 3000,
            });
          },
        }
      );
    } catch (error) {
      console.error("削除エラー:", error);
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
        <Flex position="absolute" top={4} right={4} gap={4} align="center">
          <Icon
            as={FaEdit}
            cursor="pointer"
            onClick={() => setIsEditing(true)}
            color="#46B2FF"
            boxSize={5}
          />
          <Icon
            as={FaTrash}
            cursor="pointer"
            onClick={() => {
              if (window.confirm("本当に削除しますか？")) {
                handleDelete();
              }
            }}
            color="red.300"
            boxSize={5}
          />
        </Flex>

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
            勝手に要約✨:
          </Text>
          <Text whiteSpace="pre-wrap" wordBreak="break-word">
            {idea?.summary}
          </Text>
        </Flex>
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

        <Divider my={4} />

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
          onClick={() => setShowRecommend(!showRecommend)}
          leftIcon={<Icon as={showRecommend ? FaChevronUp : FaChevronDown} />}
          isLoading={isLoading}
        >
          AI提案機能を{showRecommend ? "閉じる" : "利用する"}
        </Button>
        {showRecommend && (
          <RecommendSection recommends={recommends} isLoading={isLoading} />
        )}
      </Box>
    </Flex>
  );
}
