package handler

import (
	"fmt"
	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/pkg/log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateIdea(c echo.Context) error {
	fmt.Println("before CreateIdea")
	ctx := c.Request().Context()
	req := model.CreateIdeaInput{}
	id := c.Param("eventId")

	if err := c.Bind(&req); err != nil {
		return err
	}

	res, err := h.ideaUC.Create(ctx, id, req)

	if err != nil {
		log.Error("failed to create idea")

		return err
	}

	return c.JSON(http.StatusOK, res)
}
