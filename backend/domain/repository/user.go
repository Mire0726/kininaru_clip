package repository

import (
	"context"

	"kininaru_clip/backend/domain/model"
)

type User interface {
	BulkCreate(ctx context.Context, users []*model.User) error
	Exist(ctx context.Context, userName string) (bool, error)
}
