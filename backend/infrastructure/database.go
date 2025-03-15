package infrastructure

import (
	"fmt"
	"time"

	"kininaru_clip/backend/pkg/log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func connectDB(dialector gorm.Dialector, maxRetries int) (*gorm.DB, error) {
	for i := 0; i < maxRetries; i++ {
		db, err := gorm.Open(dialector, &gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
		})

		if err != nil {
			log.Error("failed to connect database")
		} else {
			log.Info("Success connect to database!!")
			return db, nil
		}

		log.Info("Retrying in 10 sec")
		time.Sleep(10 * time.Second)
	}

	return nil, fmt.Errorf("could not connect to tha database after %d retries", maxRetries)
}

func NewDB() (*gorm.DB, error) {
	// PostgreSQL接続文字列
	dsn := "host=postgresql user=postgres password=postgres dbname=db port=5432 sslmode=disable TimeZone=Asia/Tokyo"
	dialector := postgres.Open(dsn)
	maxRetries := 5

	db, err := connectDB(dialector, maxRetries)

	if err != nil {
		return nil, fmt.Errorf("failed to connect database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get sql.DB instance: %w", err)
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)

	return db, nil
}
