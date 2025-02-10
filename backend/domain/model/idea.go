package model

type Idea struct {
	ID        string
	Title     string
	Url       string
	CreatedBy string
	Tag       string
	EventID   string
	Likes     int32
	Summary   string
	Memo      string
	CreatedAT string
	UpdatedAt string
}

type IdeaRequest struct {
	ID        string
	Title     string
	Url       string
	CreatedBy string
	Tag       string
	EventID   string
}

type IdeaResponse struct {
	ID        string
	Title     string
	Url       string
	CreatedBy string
	Tag       string
	EventID   string
	Likes     int32
	Summary   string
	Memo      string
}
