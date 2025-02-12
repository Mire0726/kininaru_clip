package usecase

import (
	"context"

	"kininaru_clip/backend/pkg/errors"
	"kininaru_clip/backend/pkg/log"
	"kininaru_clip/backend/pkg/uid"

	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/infrastructure/datastore"
)

type UserUsecase interface {
	Create(ctx context.Context, eventID string, inputs []model.CreateUserInput) ([]*model.User, error)
	GetUsers(ctx context.Context, eventID string) ([]*model.User, error)
}

type userUC struct {
	data datastore.Data
	log  *log.Logger
}

func NewUserUsecase(data datastore.Data, log *log.Logger) UserUsecase {
	return &userUC{
		data: data,
		log:  log,
	}
}

func (u *userUC) Create(ctx context.Context, eventID string, input []model.CreateUserInput) ([]*model.User, error) {
	var users []*model.User

	for _, input := range input {
		if exist, err := u.data.ReadWriteStore().User().Exist(ctx, eventID, input.Name); err != nil {
			u.log.Error("failed to check user existence")

			return nil, err
		} else if exist {
			u.log.Error("user already exists")

			return nil, errors.NewAlreadyExistsError(input.Name)
		}

		users = append(users, &model.User{
			ID:      uid.NewGenerator().NewULID(),
			Name:    input.Name,
			EventID: eventID,
		})
	}

	if err := u.data.ReadWriteStore().User().BulkCreate(ctx, users); err != nil {
		u.log.Error("failed to create users")

		return nil, err
	}

	return users, nil
}

func (u *userUC) GetUsers(ctx context.Context, eventID string) ([]*model.User, error) {
	exist, err := u.data.ReadWriteStore().Event().Exist(ctx, eventID)
	if err != nil {

		u.log.Error("failed to check event existence")
		return nil, err
	}
	if !exist {
		u.log.Error("event does not exist")
		return nil, errors.NewNotFoundError("event")
	}
	users, err := u.data.ReadWriteStore().User().GetUsers(ctx, eventID)
	if err != nil {
		u.log.Error("failed to get users")
		return nil, err
	}
	return users, nil
}