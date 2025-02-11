package model

type Event struct {
	ID        string
	Title     string
	URL       string
}

type CreateEventInput struct {
	Title string
	Users []*CreateUserInput
}

