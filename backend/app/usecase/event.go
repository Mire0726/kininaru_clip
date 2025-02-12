package usecase

import (
	"context"

	"kininaru_clip/backend/pkg/uid"

	"kininaru_clip/backend/pkg/log"

	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/infrastructure/datastore"
)

type EventUsecase interface {
	Create(ctx context.Context, event *model.CreateEventInput) (*model.Event, error)
}

type eventUC struct {
	data datastore.Data
	log  *log.Logger
}

func NewEventUsecase(data datastore.Data, log *log.Logger) EventUsecase {
	return &eventUC{
		data: data,
		log:  log,
	}
}

func (e *eventUC) Create(ctx context.Context, input *model.CreateEventInput) (*model.Event, error) {
	id := uid.NewGenerator().NewULID()
	event := &model.Event{
		ID:    id,
		Title: input.Title,
		URL:   "group/" + id,
	}

	if err := e.data.ReadWriteStore().Event().Create(ctx, event); err != nil {
		e.log.Error("failed to create event")

		return nil, err
	}

	users := make([]*model.User, 0, len(input.Users))
	for _, user := range input.Users {
		users = append(users, &model.User{
			ID:      uid.NewGenerator().NewULID(),
			Name:    user.Name,
			EventID: id,
		})
	}

	if err := e.data.ReadWriteStore().User().BulkCreate(ctx, users); err != nil {
		e.log.Error("failed to create users")

		return nil, err
	}

	return event, nil
}
