package user

import (
	"context"

	"kininaru_clip/backend/pkg/log"

	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/domain/repository"

	"gorm.io/gorm"
)

type user struct {
	db     *gorm.DB
	logger *log.Logger
}

func NewUser(db *gorm.DB, logger *log.Logger) repository.User {
	return &user{
		db:     db,
		logger: logger,
	}
}

func (r *user) BulkCreate(ctx context.Context, users []*model.User) error {
	result := r.db.WithContext(ctx).Create(&users)
	if result.Error != nil {
		r.logger.Logger.Error("failed to create event", log.Ferror(result.Error))
		return result.Error
	}
	return nil
}

func (r *user) Exist(ctx context.Context, userName string) (bool, error) {
	var user model.User
	result := r.db.WithContext(ctx).Where("name = ?", userName).First(&user)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return false, nil
		}
		r.logger.Logger.Error("failed to get user", log.Ferror(result.Error))
		return false, result.Error
	}
	return true, nil
}
