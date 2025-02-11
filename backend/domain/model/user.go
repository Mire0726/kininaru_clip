package model

type User struct {
	ID      string
	Name    string
	EventID string
}

type CreateUserInput struct {
	Name string
}
