package pyclient

// Python サーバーへのリクエストボディのスキーマ
type SummaryRequest struct {
	URL string `json:"url"`
}

// Python サーバーからのレスポンスボディのスキーマ
type SummaryResponse struct {
	Summary string `json:"summary"`
}
