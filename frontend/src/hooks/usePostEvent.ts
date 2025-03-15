import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface UserRequest {
  name: string;
}

interface EventRequest {
  title: string;
  users: UserRequest[];
}

interface EventResponse {
  id: string;
  title: string;
  url: string;
}

const postEvent = async (eventData: EventRequest): Promise<EventResponse> => {
  const response = await axios.post<EventResponse>(
    `${apiUrl}/events`,
    eventData
  );
  return response.data;
};

export const usePostEvent = () => {
  return useMutation<EventResponse, Error, EventRequest>({
    mutationFn: postEvent,
    onError: (error) => {
      console.error("APIエラー:", error);
      console.log("frontend error", `${apiUrl}/events`);
    },
  });
};
