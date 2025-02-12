import { useQuery } from "@tanstack/react-query";
const BASE_URL = "http://localhost:8080";

interface FetchEventResponse {
  id: string;
  title: string;
  url: string;
}
const fetchEvent = async (eventId: string): Promise<FetchEventResponse> => {
  const response = await fetch(`${BASE_URL}/events/${eventId}`);
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
