package pyclient

// Python サーバーへのリクエストボディのスキーマ
type SummaryRequest struct {
	URL string `json:"url"`
}

// Python サーバーからのレスポンスボディのスキーマ
type SummaryResponse struct {
	Summary string `json:"summary"`
}

type RecommendRequest struct {
	URL string `json:"url"`
}

type RecommendItem struct {
	Name    string `json:"name"`
	URL     string `json:"url"`
	Content string `json:"content"`
}

type RecommendResponse struct {
	Recommends []*RecommendItem `json:"recommends"`
}
