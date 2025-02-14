"use client";
import { use } from "react";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { useFetchIdea } from "@/hooks/useFetchIdea";
import { SubHeader } from "@/components/SubHeader";
import Header from "@/components/header";
import {
  Button,
  Flex,
  Text,
  Icon,
  Box,
  Heading,
  Divider,
  Link,
} from "@chakra-ui/react";
import { FaUtensils, FaHotel, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface Props {
  params: Promise<{ id: string; ideaId: string }>;
}
export default function IdeaList({ params }: Props) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;
  const ideaId = resolvedParams.ideaId;
  const { fetchUsers: users } = useFetchUsers(eventId);
  const { fetchEvent: event } = useFetchEvent(eventId);
  const { fetchIdea: idea } = useFetchIdea(eventId, ideaId);
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
  const router = useRouter();

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
      <SubHeader title={event?.title} users={users} />;
      <Box
        w="full"
        maxW={boxWidth}
        bg="white"
        mt={6}
        p={boxPadding}
        borderRadius="lg"
        boxShadow="md"
        mx="auto"
      >
        <Flex align="center" gap={2} color="#46B2FF">
          <Icon as={getIconByTag(idea?.tag)} boxSize={6} />
        </Flex>

        <Heading size="lg" mt={2}>
          {idea?.title}
        </Heading>
        <Text fontSize="sm" color="gray.600" mt={1}>
          {idea?.created_by}
        </Text>

        <Divider my={4} />

        <Text fontSize="md" fontWeight="bold">
          memo:{idea?.memo}
        </Text>
        <Box h="40px" borderBottom="1px solid #46B2FF" />

        <Text fontSize="md" fontWeight="bold" mt={4}>
          Google Maps URL：
          <Link href={idea?.url} color="blue.500" isExternal>
            {idea?.url}
          </Link>
        </Text>

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
