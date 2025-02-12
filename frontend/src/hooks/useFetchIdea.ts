import { useQuery } from "@tanstack/react-query";
const BASE_URL = "http://localhost:8080";

interface FetchIdeaResponse {
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
