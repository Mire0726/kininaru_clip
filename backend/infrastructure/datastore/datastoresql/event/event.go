package event

import (
	"context"
	"kiniaru_clip/backend/pkg/log"

	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/domain/repository"

	"gorm.io/gorm"
)

type event struct {
	db     *gorm.DB
	logger *log.Logger
}

func NewEvent(db *gorm.DB, logger *log.Logger) repository.Event {
	return &event{
		db:     db,
		logger: logger,
	}
}

func (e *event) Create(ctx context.Context, event *model.Event) error {
	result := e.db.WithContext(ctx).Create(event)
	if result.Error != nil {
		e.logger.Printf("failed to create event: %v", result.Error)
		return result.Error
	}

	return nil
}
