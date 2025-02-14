import { useQuery } from "@tanstack/react-query";
const BASE_URL = "http://localhost:8080";

interface FetchIdeaResponse {
  id: string;
  title: string;
  url: string;
  created_by: string;
  tag: string;
  event_id: string;
  likes: number;
  summary: string;
  memo: string;
}

const fetchIdea = async (
  eventId: string,
  ideaId: string
): Promise<FetchIdeaResponse> => {
  const response = await fetch(`${BASE_URL}/events/${eventId}/ideas/${ideaId}`);
  if (!response.ok) {
    throw new Error("アイデアの取得に失敗しました");
  }
  return response.json();
};

export const useFetchIdea = (eventId: string, ideaId: string) => {
  const { data, isLoading } = useQuery<FetchIdeaResponse>({
    queryKey: ["idea", eventId, ideaId],
    queryFn: () => fetchIdea(eventId, ideaId),
  });

  return {
    fetchIdea: data,
    isLoading,
  };
};