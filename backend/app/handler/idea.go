package handler

import (
	"kininaru_clip/backend/domain/model"
	"kininaru_clip/backend/pkg/log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateIdea(c echo.Context) error {
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

func (h *Handler) GetIdea(c echo.Context) error {
	ctx := c.Request().Context()
	eventId := c.Param("eventId")
	ideaId := c.Param("ideaId")

	res, err := h.ideaUC.GetIdea(ctx, eventId, ideaId)
	if err != nil {
		log.Error("failed to get an idea")
		return err
	}

	return c.JSON(http.StatusOK, res)
}

func (h *Handler) GetIdeas(c echo.Context) error {
	ctx := c.Request().Context()
	id := c.Param("eventId")

	res, err := h.ideaUC.GetIdeas(ctx, id)
	if err != nil {
		log.Error("failed to get ideas")

		return err
	}

	return c.JSON(http.StatusOK, res)
}

func (h *Handler) UpdateIdeaLikes(c echo.Context) error {
	ctx := c.Request().Context()
	eventId := c.Param("eventId")
	ideaId := c.Param("ideaId")

	res, err := h.ideaUC.UpdateIdeaLikes(ctx, eventId, ideaId)
	if err != nil {
		log.Error("failed to update idea likes")
		return err
	}

	return c.JSON(http.StatusOK, res)

}
