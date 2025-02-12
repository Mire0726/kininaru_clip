import { useQuery } from "@tanstack/react-query";
const BASE_URL = "http://localhost:8080";

interface IdeaResponse {
  id: string;
  title: string;
  url: string;
  createdBy: string;
  tag: IdeaTag;
  eventId: string;
  likes: number;
  summary: string;
  memo: string;
}

enum IdeaTag {
  LOCATION = "location",
  RESTAURANT = "restaurant",
  HOTEL = "hotel",
  OTHER = "other",
}

interface FetchIdeasResponse {
  location: IdeaResponse[];
  restaurant: IdeaResponse[];
  hotel: IdeaResponse[];
  other: IdeaResponse[];
}

const fetchIdeas = async (eventId: string): Promise<FetchIdeasResponse> => {
  const response = await fetch(`${BASE_URL}/events/${eventId}/ideas`);
  if (!response.ok) {
    throw new Error("アイデアの取得に失敗しました");
  }
  return response.json();
};

export const useFetchIdeas = (eventId: string) => {
  const { data, isLoading } = useQuery<FetchIdeasResponse>({
    queryKey: ["ideas", eventId],
    queryFn: () => fetchIdeas(eventId),
  });

  return {
    fetchIdeas: data,
    isLoading,
  };
};
