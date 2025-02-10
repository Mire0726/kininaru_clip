package handler

import (
	"fmt"
	"net/http"

	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/pkg/log"

	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateUser(c echo.Context) error {
	fmt.Println("before CreateUser")
	ctx := c.Request().Context()
	req := []model.CreateUserInput{}
	id := c.Param("event_id")

	if err := c.Bind(&req); err != nil {
		return err
	}

	res, err := h.userUC.Create(ctx, id, req)

	if err != nil {
		log.Error("failed to create user")

		return err
	}

	return c.JSON(http.StatusCreated, res)
}
