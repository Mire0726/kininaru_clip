package infrastructure

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// DBConfig はデータベース接続の設定を保持します
type DBConfig struct {
    User      string
    Password  string
    Host      string
    Port      string
    DBName    string
    Charset   string
    ParseTime string
    Loc       string
}

func LoadDBConfig() (*DBConfig, error) {
    if err := godotenv.Load("./api/config/.env"); err != nil {
        return nil, fmt.Errorf("Error loading .env file: %v", err)
    }

    return &DBConfig{
        User:      os.Getenv("MYSQL_USER"),
        Password:  os.Getenv("MYSQL_PASSWORD"),
        Host:      os.Getenv("MYSQL_HOST"),
        Port:      os.Getenv("MYSQL_PORT"),
        DBName:    os.Getenv("MYSQL_DATABASE"),
        Charset:   os.Getenv("MYSQL_CHARSET"),
        ParseTime: os.Getenv("MYSQL_PARSE_TIME"),
        Loc:       os.Getenv("MYSQL_LOC"),
    }, nil
}

func NewDB(cfg *DBConfig) (*gorm.DB, error) {
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=%s&loc=%s",
        cfg.User,
        cfg.Password,
        cfg.Host,
        cfg.Port,
        cfg.DBName,
        cfg.Charset,
        cfg.ParseTime,
        cfg.Loc,
    )

    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
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