package model

type Idea struct {
	ID        string
	Title     string
	Url       string
	CreatedBy string
	Tag       IdeaTag
	EventID   string
	Likes     int32
	Summary   *string
	Memo      *string
}

type  IdeaTag string

const (
	Location   IdeaTag = "location"
	Restaurant IdeaTag = "restaurant"
	Hotel      IdeaTag = "hotel"
	Other      IdeaTag = "other"
)

type CreateIdeaInput struct {
	Title     string
	Url       string
	CreatedBy string
	Tag       IdeaTag
	EventID   string
}

type GetIdeasReponse struct {
	Location   []*Idea
	Restaurant []*Idea
	Hotel      []*Idea
	Other      []*Idea
}
