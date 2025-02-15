"use client";
import { use } from "react";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { useFetchIdea } from "@/hooks/useFetchIdea";
import { SubHeader } from "@/components/SubHeader";
import Header from "@/components/header";
import IdeaCard from "./ideaCard";
import { Button, Flex } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";

interface Props {
  params: Promise<{ id: string; ideaId: string }>;
}
export default function IdeaList({ params }: Props) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;
  const ideaId = resolvedParams.ideaId;
  const { fetchIdea: idea, isLoading: isIdeaLoading } = useFetchIdea(
    eventId,
    ideaId
  );

  const { fetchUsers: users, isLoading: isUsersLoading } =
    useFetchUsers(eventId);

  const { fetchEvent: event, isLoading: isEventLoading } =
    useFetchEvent(eventId);
  const router = useRouter();

  if (isIdeaLoading || isUsersLoading || isEventLoading) {
    return <LoadingSpinner />;
  }

  if (!idea || !users || !event) {
    return <ErrorMessage message="データの取得に失敗しました" />;
  }

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
