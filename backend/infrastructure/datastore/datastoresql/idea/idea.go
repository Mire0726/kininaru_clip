package idea

import (
	"context"
	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/domain/repository"
	"kininaru_clip/backend/pkg/log"

	"gorm.io/gorm"
)

type idea struct {
	db     *gorm.DB
	logger *log.Logger
}

func NewIdea(db *gorm.DB, logger *log.Logger) repository.Idea {
	return &idea{
		db:     db,
		logger: logger,
	}
}

func (r *idea) Create(ctx context.Context, idea *model.Idea) error {
	result := r.db.WithContext(ctx).Create(&idea)
	if result.Error != nil {
		r.logger.Logger.Error("failed to create idea", log.Ferror(result.Error))
		return result.Error
	}
	return nil
}
