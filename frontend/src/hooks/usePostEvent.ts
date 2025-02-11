import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

interface UserRequest {
  name: string;
}

interface EventRequest {
  title: string;
  user_request: UserRequest[];
}

interface EventResponse {
  id: string;
  title: string;
  url: string;
}

const postEvent = async (eventData: EventRequest): Promise<EventResponse> => {
  const response = await axios.post<EventResponse>(
    `${BASE_URL}/events`,
    eventData
  );
  return response.data;
};

export const usePostEvent = () => {
  return useMutation<EventResponse, Error, EventRequest>({
    mutationFn: postEvent,
    onError: (error) => {
      console.error("APIエラー:", error);
    },
  });
};
