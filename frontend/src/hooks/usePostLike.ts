import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

interface LikeResponse {
  id: string;
  title: string;
  url: string;
  created_by: string;
  tag: IdeaTag;
  memo: string;
  event_id: string;
  likes: number;
  summary: string;
}
enum IdeaTag {
  LOCATION = "location",
  RESTAURANT = "restaurant",
  HOTEL = "hotel",
  OTHER = "other",
}

const postLike = async (
  eventId: string,
  ideaId: string
): Promise<LikeResponse> => {
  const response = await axios.post<LikeResponse>(
    `${BASE_URL}/events/${eventId}/ideas/${ideaId}/like`
  );
  return response.data;
};

export const usePostLike = () => {
  return useMutation<LikeResponse, Error, { eventId: string; ideaId: string }>({
    mutationFn: ({ eventId, ideaId }) => postLike(eventId, ideaId),
    onError: (error) => {
      console.error("APIエラー:", error);
    },
  });
};
