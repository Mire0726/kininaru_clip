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

type GetIdeaResponse struct {
	ID            string  `json:"id"`
	Title         string  `json:"title"`
	Url           string  `json:"url"`
	CreatedBy     string  `json:"created_by"`
	CreatesByName string  `json:"created_by_name"`
	Tag           string  `json:"tag"`
	EventID       string  `json:"event_id"`
	Likes         int32   `json:"likes"`
	Summary       *string `json:"summary,omitempty"`
	Memo          *string `json:"memo,omitempty"`
}

type IdeaTag string

const (
	Location   IdeaTag = "location"
	Restaurant IdeaTag = "restaurant"
	Hotel      IdeaTag = "hotel"
	Other      IdeaTag = "other"
)

type CreateIdeaInput struct {
	Title     string `json:"title"`
	Url       string `json:"url"`
	CreatedBy string `json:"created_by"`
	Tag       string `json:"tag"`
	EventID   string `json:"event_id"`
}

type GetIdeasReponse struct {
	Location   []*Idea `json:"location"`
	Restaurant []*Idea `json:"restaurant"`
	Hotel      []*Idea `json:"hotel"`
	Other      []*Idea `json:"other"`
}

type UpdateIdeaInput struct {
	Title   *string `json:"title,omitempty"`
	Url     *string `json:"url,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Memo    *string `json:"memo,omitempty"`
}
