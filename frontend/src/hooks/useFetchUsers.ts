import { useQuery } from "@tanstack/react-query";
import { API_CONFIG } from '../constants/config';

interface UserResponse {
  id: string;
  name: string;
  event_id: string;
}

interface FetchUsersResponse {
  users: UserResponse[];
}

const fetchUsers = async (eventId: string): Promise<FetchUsersResponse> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/events/${eventId}/users`);
  if (!response.ok) {
    throw new Error("ユーザーの取得に失敗しました");
  }
  return response.json();
};

export const useFetchUsers = (eventId: string) => {
  const { data, isLoading } = useQuery<FetchUsersResponse>({
    queryKey: ["users", eventId],
    queryFn: () => fetchUsers(eventId),
  });

  return {
    fetchUsers: data,
    isLoading,
  };
};
