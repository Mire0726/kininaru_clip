package server

import (
	"net/http"

	"kininaru_clip/backend/pkg/log"

	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
)

func Serve(addr string) {
	e := echo.New()
	logger := log.New()

	e.Use(echomiddleware.Recover())
	e.Use(echomiddleware.Logger())

	e.Use(echomiddleware.CORSWithConfig(echomiddleware.CORSConfig{
		Skipper:      echomiddleware.DefaultCORSConfig.Skipper,
		AllowOrigins: echomiddleware.DefaultCORSConfig.AllowOrigins,
		AllowMethods: echomiddleware.DefaultCORSConfig.AllowMethods,
		AllowHeaders: []string{"Content-Type", "Accept", "Origin", "X-Token", "Authorization"},
	}))

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Welcome to unibox")
	})

	/* ===== サーバの起動 ===== */
	logger.Info("Server running", log.Fstring("address", addr))
	if err := e.Start(addr); err != nil {
		logger.Error("Failed to start server", log.Ferror(err))
	}
}
