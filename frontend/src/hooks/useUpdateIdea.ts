import { useMutation, UseMutationResult } from "@tanstack/react-query";

const BASE_URL = "http://localhost:8080";

interface UpdateIdeaParams {
  eventId: string;
  ideaId: string;
}

interface UpdateIdeaRequest {
  title?: string;
  url?: string;
  summary?: string;
  memo?: string;
}

interface UpdateIdeaResponse {
  id: string;
  title: string;
  url: string;
  created_by: string;
  tag: string;
  event_id: string;
  likes: number;
  summary: string;
  memo: string;
}

const updateIdea = async (
  params: UpdateIdeaParams,
  requestBody: UpdateIdeaRequest
): Promise<UpdateIdeaResponse> => {
  const response = await fetch(
    `${BASE_URL}/events/${params.eventId}/ideas/${params.ideaId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    throw new Error("アイデアの更新に失敗しました");
  }

  return response.json();
};

interface MutationVariables {
    params: UpdateIdeaParams;
    requestBody: UpdateIdeaRequest;
  }
  
  export const useUpdateIdea = (): UseMutationResult<
    UpdateIdeaResponse,
    Error,
    MutationVariables
  > => {
    return useMutation({
      mutationFn: async ({ params, requestBody }: MutationVariables) => {
        return updateIdea(params, requestBody);
      }
    });
  };