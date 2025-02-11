import { useQuery } from "@tanstack/react-query";
const BASE_URL = "http://localhost:8080";

interface UserResponse {
  id: string;
  name: string;
  event_id: string;
}

interface FetchUsersResponse {
  users: UserResponse[];
}

const fetchUsers = async (eventId: string): Promise<FetchUsersResponse> => {
  console.log(eventId);
  const response = await fetch(`${BASE_URL}/events/${eventId}/users`);
  if (!response.ok) {
    throw new Error("ユーザーの取得に失敗しました");
  }
  return response.json();
};

export const useFetchUsers = (eventId: string) => {
  return useQuery<FetchUsersResponse>({
    queryKey: ["eventId", eventId],
    queryFn: () => fetchUsers(eventId),
  });
};
