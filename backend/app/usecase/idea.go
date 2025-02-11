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
		u.log.Error("failed to create event")

		return nil, err
	}

	return idea, nil
}
