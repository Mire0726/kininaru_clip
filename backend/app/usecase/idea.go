package usecase

import (
	"context"
	"errors"

	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/infrastructure/datastore"
	"kininaru_clip/backend/infrastructure/pyclient"

	"kininaru_clip/backend/pkg/log"
	"kininaru_clip/backend/pkg/uid"
)

type IdeaUsecase interface {
	Create(ctx context.Context, eventID string, input model.CreateIdeaInput) (*model.Idea, error)
	GetIdea(ctx context.Context, eventId string, ideaId string) (*model.GetIdeaResponse, error)
	GetIdeas(ctx context.Context, eventId string) (*model.GetIdeasReponse, error)
	Update(ctx context.Context, eventID, ideaID string, input model.UpdateIdeaInput) (*model.Idea, error)
	UpdateIdeaLikes(ctx context.Context, eventId, ideaId string) (*model.Idea, error)
	Delete(ctx context.Context, eventId, ideaId string) error
}

type ideaUC struct {
	data     datastore.Data
	log      *log.Logger
	pyClient pyclient.Client
}

func NewIdeaUsecase(data datastore.Data, log *log.Logger, baseURL string) IdeaUsecase {
	return &ideaUC{
		data:     data,
		log:      log,
		pyClient: pyclient.NewClient(baseURL),
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

	summary, err := u.pyClient.GetSummary(ctx, input.Url)
	if err == nil {
		idea.Summary = &summary
	} else {
		u.log.Error("failed to get summary from python server")
	}

	if err = u.data.ReadWriteStore().Idea().Create(ctx, idea); err != nil {
		u.log.Error("failed to create idea")

		return nil, err
	}

	return idea, nil
}

func (u *ideaUC) Update(ctx context.Context, eventID, ideaID string, input model.UpdateIdeaInput) (*model.Idea, error) {
	idea, err := u.data.ReadWriteStore().Idea().Update(ctx, eventID, ideaID, input)
	if err != nil {
		u.log.Error("failed to update idea")
		return nil, err
	}
	return idea, nil
}

func (u *ideaUC) GetIdea(ctx context.Context, eventId, ideaId string) (*model.GetIdeaResponse, error) {
	idea, err := u.data.ReadWriteStore().Idea().GetIdea(ctx, eventId, ideaId)
	if err != nil {
		u.log.Error("failed to get an idea")
		return nil, err
	}

	user, err := u.data.ReadWriteStore().User().Get(ctx, eventId, idea.CreatedBy)
	if err != nil {
		u.log.Error("failed to get user")
		return nil, err
	}

	res := &model.GetIdeaResponse{
		ID:            idea.ID,
		Title:         idea.Title,
		Url:           idea.Url,
		CreatedBy:     idea.CreatedBy,
		CreatesByName: user.Name,
		Tag:           idea.Tag,
		EventID:       idea.EventID,
		Likes:         idea.Likes,
		Summary:       idea.Summary,
		Memo:          idea.Memo,
	}

	return res, nil
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

func (u *ideaUC) Delete(ctx context.Context, eventId, ideaId string) error {
	exist, err := u.data.ReadWriteStore().Idea().Exist(ctx, eventId, ideaId)
	if err != nil {
		u.log.Error("failed to check idea exist")

		return err
	}
	if !exist {
		u.log.Error("idea does not exist")
		return err
	}
	if err := u.data.ReadWriteStore().Idea().Delete(ctx, eventId, ideaId); err != nil {
		u.log.Error("failed to delete idea")

		return errors.New("failed to delete idea")
	}
	return nil
}
