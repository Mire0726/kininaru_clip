import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_CONFIG } from '../constants/config';

interface IdeaRequest {
  title: string;
  url?: string;
  created_by: string;
  tag: IdeaTag;
  memo?: string;
}

interface IdeaResponse {
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

const postIdea = async (
  eventId: string,
  ideaData: IdeaRequest
): Promise<IdeaResponse> => {
  const response = await axios.post<IdeaResponse>(
    `${API_CONFIG.BASE_URL}/events/${eventId}/ideas`,
    ideaData
  );
  return response.data;
};

export const usePostIdea = () => {
  return useMutation<
    IdeaResponse,
    Error,
    { eventId: string; ideaData: IdeaRequest }
  >({
    mutationFn: ({ eventId, ideaData }) => postIdea(eventId, ideaData),
    onError: (error) => {
      console.error("APIエラー:", error);
    },
  });
};
