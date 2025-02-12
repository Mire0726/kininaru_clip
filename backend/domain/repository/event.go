package repository

import (
	"context"

	"kininaru_clip/backend/domain/model"
)

type Event interface {
	Create(ctx context.Context, event *model.Event) error
	Exist(ctx context.Context, eventID string) (bool, error)
	GetEvent(ctx context.Context, eventID string) (*model.Event, error)
}
