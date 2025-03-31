package model

type Recommend struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Url     string `json:"url"`
	IdeaID  string `json:"idea_id"`
	Content string `json:"content"`
}

type RecommendResponse struct {
	Recommends []*Recommend `json:"recommends"`
}
