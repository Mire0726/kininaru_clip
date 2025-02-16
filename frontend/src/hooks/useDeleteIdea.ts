import { useMutation } from "@tanstack/react-query";
import { API_CONFIG } from "../constants/config";
interface DeleteIdeaParams {
  eventId: string;
  ideaId: string;
}

const deleteIdea = async ({
  eventId,
  ideaId,
}: DeleteIdeaParams): Promise<void> => {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}/events/${eventId}/ideas/${ideaId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("アイデアの削除に失敗しました");
  }
};

export const useDeleteIdea = () => {
  return useMutation({
    mutationFn: deleteIdea,
  });
};
