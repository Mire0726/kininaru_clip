package model

type Idea struct {
	ID        string
	Title     string
	Url       string
	CreatedBy string
	Tag       string
	EventID   string
	Likes     int32
	Summary   *string
	Memo      *string
}

type CreateIdeaInput struct {
	Title     string
	Url       string
	CreatedBy string
	Tag       string
	EventID   string
}

type GetIdeasReponse struct {
	Location    []*Idea
	Resutaurant []*Idea
	Hotel       []*Idea
	Other       []*Idea
}
