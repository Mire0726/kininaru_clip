package idea

import (
	"context"
	"fmt"

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

func (r *idea) Update(ctx context.Context, eventId, ideaId string, input model.UpdateIdeaInput) (*model.Idea, error) {
	result := r.db.WithContext(ctx).Model(&model.Idea{}).
		Where("id = ?", ideaId).
		Where("event_id = ?", eventId).
		Updates(map[string]interface{}{
			"title":   input.Title,
			"url":     input.Url,
			"summary": input.Summary,
			"memo":    input.Memo,
		})

	if result.Error != nil {
		r.logger.Error("failed to update idea", log.Ferror(result.Error))
		return nil, result.Error
	}

	var updateIdea *model.Idea
	result = r.db.WithContext(ctx).Where("id = ?", ideaId).Where("event_id = ?", eventId).First(&updateIdea)
	if result.Error != nil {
		r.logger.Error("failed to update idea", log.Ferror(result.Error))
		return nil, result.Error
	}
	return updateIdea, nil
}

func (r *idea) UpdateIdeaLikes(ctx context.Context, eventId string, ideaId string) (*model.Idea, error) {
	result := r.db.WithContext(ctx).Model(&model.Idea{}).
		Where("id = ?", ideaId).
		Where("event_id = ?", eventId).
		Update("likes", gorm.Expr("likes + ?", 1))

	if result.Error != nil {
		r.logger.Error("failed to update idea likes", log.Ferror(result.Error))
		return nil, result.Error
	}

	if result.RowsAffected == 0 {
		err := fmt.Errorf("no rows were updated")
		r.logger.Error("no rows were updated", log.Ferror(result.Error))
		return nil, err
	}

	var updateIdea *model.Idea
	result = r.db.WithContext(ctx).Where("id = ?", ideaId).Where("event_id = ?", eventId).First(&updateIdea)
	if result.Error != nil {
		r.logger.Error("failed to update idea likes", log.Ferror(result.Error))
		return nil, result.Error
	}
	return updateIdea, nil
}

func (r *idea) Delete(ctx context.Context, eventId, ideaId string) error {
	result := r.db.WithContext(ctx).Where("id = ?", ideaId).Where("event_id = ?", eventId).Delete(&model.Idea{})
	if result.Error != nil {
		r.logger.Error("failed to delete idea in datastore", log.Ferror(result.Error))
		return result.Error
	}

	return nil
}

func (r *idea) Exist(ctx context.Context, eventId, ideaId string) (bool, error) {
	var count int64
	result := r.db.WithContext(ctx).Model(&model.Idea{}).
		Where("id = ?", ideaId).
		Where("event_id = ?", eventId).
		Count(&count)
	if result.Error != nil {
		r.logger.Error("failed to check idea existence", log.Ferror(result.Error))
		return false, result.Error
	}

	return count > 0, nil
}

func (r *idea) GetRecommendItems(ctx context.Context, ideaId string) (*model.RecommendResponse, error) {
	var recommendItems []*model.Recommend
	fmt.Println("befor get rec item")
	result := r.db.WithContext(ctx).Where("idea_id = ?", ideaId).Find(&recommendItems)
	if result.Error != nil {
		r.logger.Logger.Error("failed to get recommend items", log.Ferror(result.Error))
		return nil, result.Error
	}

	return &model.RecommendResponse{Recommends: recommendItems}, nil
}
