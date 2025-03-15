import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_CONFIG } from "../constants/config";

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
    `${API_CONFIG.BASE_URL}/events`,
    eventData
  );
  return response.data;
};

export const usePostEvent = () => {
  return useMutation<EventResponse, Error, EventRequest>({
    mutationFn: postEvent,
    onError: (error) => {
      console.error("APIエラー:", error);
      console.log("frontend error",`${API_CONFIG.BASE_URL}/events`);
      
    },
  });
};
