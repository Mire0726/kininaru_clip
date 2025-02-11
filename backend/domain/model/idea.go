package model

type Idea struct {
	ID        string  `json:"id"`
	Title     string  `json:"title"`
	Url       string  `json:"url"`
	CreatedBy string  `json:"created_by"`
	Tag       string  `json:"tag"`
	EventID   string  `json:"event_id"`
	Likes     int32   `json:"likes"`
	Summary   *string `json:"summary,omitempty"`
	Memo      *string `json:"memo,omitempty"`
}

type CreateIdeaInput struct {
	Title     string `json:"title"`
	Url       string `json:"url"`
	CreatedBy string `json:"created_by"`
	Tag       string `json:"tag"`
	EventID   string `json:"event_id"`
}
