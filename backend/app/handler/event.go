package handler

import (
	"fmt"
	"net/http"

	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/pkg/log"

	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateEvent(c echo.Context) error {
	fmt.Println("before CreateEvent")
	ctx := c.Request().Context()
	req := &model.CreateEventInput{}

	if err := c.Bind(&req); err != nil {
		return err
	}

	res, err := h.eventUC.Create(ctx, req)
	
	if err != nil {
		log.Error("failed to create event")

		return err
	}

	return c.JSON(http.StatusCreated, res)
}
