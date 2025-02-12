package handler

import (
	"fmt"
	"net/http"

	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/pkg/errors"
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

	eventID := c.Param("eventId")
	_, err := h.userUC.GetUsers(ctx, eventID)
	if err != nil {
		if e, ok := err.(*errors.Error); ok {
			switch e.Code {
			case errors.CodeNotFound:
				return c.JSON(http.StatusConflict, map[string]string{
					"error": e.Message,
				})
			}
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "internal server error",
		})
	}

	res, err := h.eventUC.Create(ctx, req)

	if err != nil {
		log.Error("failed to create event")

		return err
	}

	return c.JSON(http.StatusCreated, res)
}

func (h *Handler) GetEvent(c echo.Context) error {
	fmt.Println("before GetEvent")
	ctx := c.Request().Context()
	eventId := c.Param("eventId")

	res, err := h.eventUC.GetEvent(ctx, eventId)
	if err != nil {
		log.Error("failed to get an event")
		return err
	}

	return c.JSON(http.StatusOK, res)
}
