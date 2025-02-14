"use client";
import { use } from "react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Text, VStack, Icon, HStack } from "@chakra-ui/react";
import {
  FaUtensils,
  FaHotel,
  FaCamera,
  FaShoppingBag,
  FaHeart,
} from "react-icons/fa";
import { useFetchIdeas } from "../../../hooks/useFetchIdeas";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { usePostLike } from "../../../hooks/usePostLike";
import { AddKinaruModal } from "./modal";
import Header from "../../../components/header";

const categories = [
  { label: "飲食店", icon: FaUtensils },
  { label: "ホテル", icon: FaHotel },
  { label: "行きたい場所", icon: FaCamera },
  { label: "その他", icon: FaShoppingBag },
];
interface Props {
  params: Promise<{ id: string }>;
}
export default function IdeaList({ params }: Props) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: postLike } = usePostLike();
  const { fetchIdeas: ideas } = useFetchIdeas(eventId);
  const { fetchUsers: users } = useFetchUsers(eventId);
  const { fetchEvent: event } = useFetchEvent(eventId);
  const hotelIdeas = ideas?.hotel || [];
  const locationIdeas = ideas?.location || [];
  const restaurantIdeas = ideas?.restaurant || [];
  const otherIdeas = ideas?.other || [];
  const handleLike = async (eventId: string, ideaId: string) => {
    postLike(
      { eventId, ideaId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["ideas", eventId],
          });
        },
        onError: () => {
          console.error("いいねの送信に失敗しました");

        },
      }
    );
  };

  return (
    <Flex direction="column" minH="100vh" bg="#FFF8F8">
      <Header />
      <Flex direction="column" align="center" mt={6} px={4}>
        <Text fontSize="2xl" fontWeight="bold" color="#46B2FF">
          {event?.title}
        </Text>
        <Text fontSize="sm" color="gray.500" mb={6}>
          {users?.users?.length
            ? users.users.map((user) => user.name).join("・")
            : "メンバーがいません"}
        </Text>
        <Button
          bg="white"
          boxShadow="md"
          px={6}
          py={4}
          borderRadius="md"
          _hover={{ bg: "gray.100" }}
          onClick={() => setIsModalOpen(true)}
        >
          気になるを追加
        </Button>
        <AddKinaruModal
          eventId={eventId}
          fetchUsers={users}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <VStack spacing={4} mt={6} w="full" maxW="800px">
          {categories.map(({ label, icon }) => (
            <Flex
              key={label}
              justify="space-between"
              align="center"
              w="full"
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="sm"
              borderBottom="2px solid #46B2FF"
            >
              <Flex align="center" gap={3}>
                <Icon as={icon} boxSize={6} color="#46B2FF" />
                <Text fontWeight="bold">{label}</Text>
              </Flex>
              <Flex direction="column" gap={2}>
                {label === "飲食店" &&
                  restaurantIdeas.map((idea) => (
                    <HStack>
                      <Text
                        key={idea.id}
                        fontSize="sm"
                        color="gray.700"
                        textAlign="right"
                      >
                        {idea.title}
                      </Text>
                      <Icon
                        as={FaHeart}
                        boxSize={4}
                        color="red.400"
                        cursor="pointer"
                        onClick={() => handleLike(eventId, idea.id)}
                      />
                      <Text fontSize="sm" color="gray.700">
                        {idea.likes ?? 0}
                      </Text>
                    </HStack>
                  ))}
                {label === "ホテル" &&
                  hotelIdeas.map((idea) => (
                    <Text
                      key={idea.id}
                      fontSize="sm"
                      color="gray.700"
                      textAlign="right"
                    >
                      {idea.title}
                    </Text>
                  ))}
                {label === "行きたい場所" &&
                  locationIdeas.map((idea) => (
                    <Text
                      key={idea.id}
                      fontSize="sm"
                      color="gray.700"
                      textAlign="right"
                    >
                      {idea.title}
                      {idea.likes ?? 0}
                    </Text>
                  ))}
                {label === "その他" &&
                  otherIdeas.map((idea) => (
                    <Text
                      key={idea.id}
                      fontSize="sm"
                      color="gray.700"
                      textAlign="right"
                    >
                      {idea.title}
                      {idea.likes ?? 0}
                    </Text>
                  ))}
              </Flex>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Flex>
  );
}
