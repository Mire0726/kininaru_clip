package model

type Event struct {
	ID          string
	Title       string
	URL         string
	CreatedAt   string
	UpdatedAt   string
}

type CreateEventInput struct {
	Title string
	URL string
}
