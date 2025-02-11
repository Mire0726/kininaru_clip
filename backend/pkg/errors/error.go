package errors

import "fmt"

type Code int

const (
	CodeUnknown       Code = iota
	CodeAlreadyExists    
	CodeNotFound
	CodeInvalidInput
)

type Error struct {
	Code    Code
	Message string
}

func (e *Error) Error() string {
	return e.Message
}

func NewAlreadyExistsError(name string) error {
	return &Error{
		Code:    CodeAlreadyExists,
		Message: fmt.Sprintf("'%s' already exists", name),
	}
}

func NewNotFoundError(name string) error {
	return &Error{
		Code:    CodeNotFound,
		Message: fmt.Sprintf("'%s' not found", name),
	}
}
