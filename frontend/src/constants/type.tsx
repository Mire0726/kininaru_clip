export type IdeaTag = "restaurant" | "hotel" | "location" | "other";

// レスポンスの個別アイテムの型
export interface RecommendItem {
  id: string;
  name: string;
  url: string;
  idea_id: string;
  content: string;
}

// レスポンス全体の型
export interface FetchRecommendResponse {
  recommends: RecommendItem[];
}
