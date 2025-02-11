"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  VStack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FaUtensils, FaHotel, FaCamera, FaShoppingBag } from "react-icons/fa";
import { useFetchIdeas } from "../../../hooks/useFetchIdeas";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import AddKinaruModal from "./modal";
import Header from "../../../components/header";

const categories = [
  { label: "飲食店", icon: FaUtensils },
  { label: "ホテル", icon: FaHotel },
  { label: "行きたい場所", icon: FaCamera },
  { label: "その他", icon: FaShoppingBag },
];

export default function IdeaList({ params }: { params: { eventId: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useFetchIdeas(params.eventId);
  const { data: users } = useFetchUsers(params.eventId);
  const hotelIdeas = data?.hotel || [];
  const locationIdeas = data?.location || [];
  const restaurantIdeas = data?.restaurant || [];
  const otherIdeas = data?.other || [];

  return (
    <Flex direction="column" minH="100vh" bg="#FFF8F8">
      <Header />
      <Flex direction="column" align="center" mt={6} px={4}>
        <Text fontSize="2xl" fontWeight="bold" color="#46B2FF">
          沖縄旅行
        </Text>
        <Text fontSize="sm" color="gray.500" mb={6}>
          {users?.users.map((user) => user.name).join("・")}
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
              <Text fontSize="sm" color="gray.500">
                まだ登録されていません
              </Text>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Flex>
  );
}
