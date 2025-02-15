package handler

import (
	"kininaru_clip/backend/app/usecase"
	"kininaru_clip/backend/infrastructure/datastore"
	"kininaru_clip/backend/pkg/log"
)

type Handler struct {
	eventUC usecase.EventUsecase
	userUC  usecase.UserUsecase
	ideaUC  usecase.IdeaUsecase
}

func NewHandler(data datastore.Data, log *log.Logger, baseURL string) *Handler {
	return &Handler{
		eventUC: usecase.NewEventUsecase(data, log),
		userUC:  usecase.NewUserUsecase(data, log),
		ideaUC:  usecase.NewIdeaUsecase(data, log, baseURL),
	}
}
