import { useQuery } from "@tanstack/react-query";
import { API_CONFIG } from "../constants/config";
import { FetchRecommendResponse } from "../constants/type";

const fetchRecommend = async (
  eventId: string,
  ideaId: string
): Promise<FetchRecommendResponse> => {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}/events/${eventId}/ideas/${ideaId}/recommends`
  );
  if (!response.ok) {
    throw new Error("アイデアの取得に失敗しました");
  }
  return response.json();
};

export const useFetchRecommend = (eventId: string, ideaId: string) => {
  const { data, isLoading } = useQuery<FetchRecommendResponse>({
    queryKey: ["recommend", eventId, ideaId],
    queryFn: () => fetchRecommend(eventId, ideaId),
  });

  return {
    fetchRecommend: data,
    isLoading,
  };
};
