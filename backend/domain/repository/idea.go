package repository

import (
	"context"

	"kininaru_clip/backend/domain/model"
)

type Idea interface {
	Create(ctx context.Context, idea *model.Idea) error
	GetIdea(ctx context.Context, eventId string, ideaId string) (*model.Idea, error)
	GetIdeas(ctx context.Context, eventId string) (*model.GetIdeasReponse, error)
	Update(ctx context.Context, eventId, ideaId string, input model.UpdateIdeaInput) (*model.Idea, error)
	UpdateIdeaLikes(ctx context.Context, eventId string, ideaId string) (*model.Idea, error)
	Delete(ctx context.Context, eventId, ideaId string) error
	Exist(ctx context.Context, eventId, ideaId string) (bool, error)
	GetRecommendItems(ctx context.Context, ideaId string) (*model.RecommendResponse, error)
	BulkCreateRecommends(ctx context.Context, recommends []*model.Recommend) error
}
