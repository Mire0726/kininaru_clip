package repository

import (
	"context"
	"kininaru_clip/backend/domain/model"
)

type Idea interface {
	Create(ctx context.Context, idea *model.Idea) error
}
