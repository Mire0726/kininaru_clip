import { useQuery } from "@tanstack/react-query";
import { API_CONFIG } from "../constants/config";

interface FetchEventResponse {
  id: string;
  title: string;
  url: string;
}
const fetchEvent = async (eventId: string): Promise<FetchEventResponse> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/events/${eventId}`);
  if (!response.ok) {
    throw new Error("イベントの取得に失敗しました");
  }
  return response.json();
};

export const useFetchEvent = (eventId: string) => {
  const { data, isLoading } = useQuery<FetchEventResponse>({
    queryKey: ["event", eventId],
    queryFn: () => fetchEvent(eventId),
  });

  return {
    fetchEvent: data,
    isLoading,
  };
};
