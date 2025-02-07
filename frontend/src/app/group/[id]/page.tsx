"use client";

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
import Header from "../../../components/header";

const categories = [
  { label: "飲食店", icon: FaUtensils },
  { label: "ホテル", icon: FaHotel },
  { label: "行きたい場所", icon: FaCamera },
  { label: "その他", icon: FaShoppingBag },
];

export default function IdeaList({ params }: { params: { id: string } }) {
  return (
    <Flex direction="column" minH="100vh" bg="#FFF8F8">
      <Header />
      <Flex direction="column" align="center" mt={6} px={4}>
        <Text fontSize="2xl" fontWeight="bold" color="#46B2FF">
          沖縄旅行
        </Text>
        <Text fontSize="sm" color="gray.500" mb={6}>
          こしたろう・こしむ
        </Text>
        <Button
          bg="white"
          boxShadow="md"
          px={6}
          py={4}
          borderRadius="md"
          _hover={{ bg: "gray.100" }}
        >
          気になるを追加
        </Button>

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
