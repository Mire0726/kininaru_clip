package event

import (
	"context"
	"kininaru_clip/backend/pkg/log"

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
		e.logger.Logger.Error("failed to create event", log.Ferror(result.Error))
		return result.Error
	}

	return nil
}

func (e *event) Exist(ctx context.Context, eventID string) (bool, error) {
	var event model.Event
	result := e.db.WithContext(ctx).Where("id = ?", eventID).First(&event)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return false, nil
		}
		e.logger.Logger.Error("failed to get event", log.Ferror(result.Error))
		return false, result.Error
	}

	return true, nil
}

func (e *event) GetEvent(ctx context.Context, eventID string) (*model.Event, error) {
	var event model.Event
	result := e.db.WithContext(ctx).Where("id = ?", eventID).First(&event)
	if result.Error != nil {
		e.logger.Logger.Error("failed to get event", log.Ferror(result.Error))
		return nil, result.Error
	}

	return &event, nil
}
