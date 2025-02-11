package model

type Event struct {
	ID        string
	Title     string
	URL       string
	CreatedAt string
	UpdatedAt string
}

type CreateEventInput struct {
	Title string
	URL   string
}

type User struct {
	ID      string
	Name    string
	EventID string
}

type CreateUserInput struct {
	Name string
}
