package repository

import (
	"context"

	"kininaru_clip/backend/domain/model"
)

type User interface {
	BulkCreate(ctx context.Context, users []*model.User) error
	Exist(ctx context.Context, eventID, userName string) (bool, error)
	GetUsers(ctx context.Context, eventID string) ([]*model.User, error)
	Get(ctx context.Context, evenID, userID string) (*model.User, error)
}
