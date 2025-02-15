import { useQuery } from "@tanstack/react-query";
import { API_CONFIG } from "../constants/config";

interface FetchIdeaResponse {
  id: string;
  title: string;
  url: string;
  created_by: string;
  created_by_name: string;
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
  const response = await fetch(`${API_CONFIG.BASE_URL}/events/${eventId}/ideas/${ideaId}`);
  if (!response.ok) {
    throw new Error("アイデアの取得に失敗しました");
  }
  return response.json();
};

export const useFetchIdea = (eventId: string, ideaId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["idea", eventId, ideaId],
    queryFn: () => fetchIdea(eventId, ideaId),
    staleTime: 0,
    gcTime: 1000 * 60,
    refetchOnMount: true,
  });

  return {
    fetchIdea: data,
    isLoading,
  };
};
