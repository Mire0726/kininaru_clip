package handler

import (
	"kininaru_clip/backend/app/usecase"
	"kininaru_clip/backend/infrastructure/datastore"
	"kininaru_clip/backend/pkg/log"
)

type Handler struct {
	eventUC usecase.EventUsecase
}

func NewHandler(data datastore.Data, log *log.Logger) *Handler {
	return &Handler{
		eventUC: usecase.NewEventUsecase(data, log),
	}
}
