package usecase

import (
	"context"
	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/infrastructure/datastore"

	"kininaru_clip/backend/pkg/log"
	"kininaru_clip/backend/pkg/uid"
)

type IdeaUsecase interface {
	Create(ctx context.Context, eventID string, input model.CreateIdeaInput) (*model.Idea, error)
	GetIdea(ctx context.Context, eventId string, ideaId string) (*model.Idea, error)
	GetIdeas(ctx context.Context, eventId string) (*model.GetIdeasReponse, error)
	UpdateIdeaLikes(ctx context.Context, eventId string, ideaId string) (*model.Idea, error)
}

type ideaUC struct {
	data datastore.Data
	log  *log.Logger
}

func NewIdeaUsecase(data datastore.Data, log *log.Logger) IdeaUsecase {
	return &ideaUC{
		data: data,
		log:  log,
	}
}

func (u *ideaUC) Create(ctx context.Context, eventID string, input model.CreateIdeaInput) (*model.Idea, error) {
	idea := &model.Idea{
		ID:        uid.NewGenerator().NewULID(),
		Title:     input.Title,
		Url:       input.Url,
		CreatedBy: input.CreatedBy,
		Tag:       input.Tag,
		EventID:   eventID,
	}

	if err := u.data.ReadWriteStore().Idea().Create(ctx, idea); err != nil {
		u.log.Error("failed to create idea")

		return nil, err
	}

	return idea, nil
}

func (u *ideaUC) GetIdea(ctx context.Context, eventId string, ideaId string) (*model.Idea, error) {
	idea, err := u.data.ReadWriteStore().Idea().GetIdea(ctx, eventId, ideaId)
	if err != nil {
		u.log.Error("failed to get an idea")
		return nil, err
	}

	return idea, nil
}

func (u *ideaUC) GetIdeas(ctx context.Context, eventId string) (*model.GetIdeasReponse, error) {
	ideas, err := u.data.ReadWriteStore().Idea().GetIdeas(ctx, eventId)
	if err != nil {
		u.log.Error("failed to get idea")
		return nil, err
	}
	return ideas, nil
}

func (u *ideaUC) UpdateIdeaLikes(ctx context.Context, eventId string, ideaId string) (*model.Idea, error) {
	idea, err := u.data.ReadWriteStore().Idea().UpdateIdeaLikes(ctx, eventId, ideaId)
	if err != nil {
		u.log.Error("failed to update idea likes")
		return nil, err
	}

	return idea, nil
}
