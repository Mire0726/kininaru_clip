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

func (r *idea) GetIdea(ctx context.Context, eventId string, ideaId string) (*model.Idea, error) {
	var idea *model.Idea
	result := r.db.WithContext(ctx).Where("event_id = ?", eventId).Where("id = ?", ideaId).First(&idea)
	if result.Error != nil {
		r.logger.Logger.Error("failed to get an idea", log.Ferror(result.Error))
		return nil, result.Error
	}

	return idea, nil
}

func (r *idea) GetIdeas(ctx context.Context, eventId string) (*model.GetIdeasReponse, error) {
	var ideas_location []*model.Idea
	var ideas_restaurant []*model.Idea
	var ideas_hotel []*model.Idea
	var ideas_other []*model.Idea

	result := r.db.WithContext(ctx).Where("event_id = ? AND tag = ?", eventId, model.Location).Find(&ideas_location)
	if result.Error != nil {
		r.logger.Logger.Error("failed to get ideas", log.Ferror(result.Error))
		return nil, result.Error
	}

	result = r.db.WithContext(ctx).Where("event_id = ? AND tag = ?", eventId, model.Restaurant).Find(&ideas_restaurant)
	if result.Error != nil {
		r.logger.Logger.Error("failed to get ideas", log.Ferror(result.Error))
		return nil, result.Error
	}

	result = r.db.WithContext(ctx).Where("event_id = ? AND tag = ?", eventId, model.Hotel).Find(&ideas_hotel)
	if result.Error != nil {
		r.logger.Logger.Error("failed to get ideas", log.Ferror(result.Error))
		return nil, result.Error
	}

	result = r.db.WithContext(ctx).Where("event_id = ? AND tag = ?", eventId, model.Other).Find(&ideas_other)
	if result.Error != nil {
		r.logger.Logger.Error("failed to get ideas", log.Ferror(result.Error))
		return nil, result.Error
	}

	ideas := &model.GetIdeasReponse{
		Location:   ideas_location,
		Restaurant: ideas_restaurant,
		Hotel:      ideas_hotel,
		Other:      ideas_other,
	}

	return ideas, nil
}
