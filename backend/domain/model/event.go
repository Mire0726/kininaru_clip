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

type User struct {
	ID      string
	Name    string
	EventID string
}

type CreateUserInput struct {
	Name string
}
