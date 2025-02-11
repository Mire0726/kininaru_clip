package model

type Event struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	URL   string `json:"url"`
}

type CreateEventInput struct {
	Title string             `json:"title"`
	Users []*CreateUserInput `json:"users"`
}
