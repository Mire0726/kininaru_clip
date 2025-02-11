package handler

import (
	"net/http"

	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/pkg/errors"

	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateUser(c echo.Context) error {
	ctx := c.Request().Context()
	req := []model.CreateUserInput{}
	id := c.Param("eventId")

	if err := c.Bind(&req); err != nil {
		return err
	}

	users, err := h.userUC.Create(ctx, id, req)
	if err != nil {
		if e, ok := err.(*errors.Error); ok {
			switch e.Code {
			case errors.CodeAlreadyExists:
				return c.JSON(http.StatusConflict, map[string]string{
					"error": e.Message,
				})
			}
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "internal server error",
		})
	}
	return c.JSON(http.StatusOK, users)
}

func (h *Handler) GetUsers(c echo.Context) error {
	ctx := c.Request().Context()
	eventID := c.Param("eventId")

	users, err := h.userUC.GetUsers(ctx, eventID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "internal server error",
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"users": users,
	})
}