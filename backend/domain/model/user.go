package model

type User struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	EventID string `json:"event_id"`
}

type CreateUserInput struct {
	Name string `json:"name"`
}
