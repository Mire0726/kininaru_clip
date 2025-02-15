"use client";
import { use } from "react";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { useFetchIdea } from "@/hooks/useFetchIdea";
import { SubHeader } from "@/components/SubHeader";
import Header from "@/components/header";
import IdeaCard from "./ideaCard";
import {
  Button,
  Flex,
} from "@chakra-ui/react";
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
      <SubHeader title={event?.title} users={users} />
      <IdeaCard idea={idea} eventId={eventId} ideaId={ideaId} />
    </Flex>
  );
}
