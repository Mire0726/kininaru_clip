# ==========================
# Build Environment
# ==========================

.PHONY: build
build:
	docker-compose -f docker-compose.dev.yml build $(ARGS)
	docker-compose -f docker-compose.dev.yml up -d

.PHONY: up
up:
	docker-compose -f docker-compose.dev.yml up -d

.PHONY: down
down:
	docker-compose -f docker-compose.dev.yml down

# ==========================
# migrations
# まず、brew install golang-migrateが必要です。
# ==========================

MIGRATE=migrate
MIGRATIONS_DIR=./migrations
DB_URL=postgres://postgres:postgres@localhost:5432/db?sslmode=disable

# 新しくマイグレーションファイルを作成する
# コマンド例: make new-migration name=create_column_users_table
new-migration:
ifndef name
	$(error name is required. Usage: make new-migration name=create_table)
endif
	$(MIGRATE) create -ext sql -dir $(MIGRATIONS_DIR) -seq $(name)

# マイグレーションを適用する
migrate-up:
	$(MIGRATE) -path $(MIGRATIONS_DIR) -database "$(DB_URL)" up

# マイグレーションをダウングレードする
migrate-down:
	$(MIGRATE) -path $(MIGRATIONS_DIR) -database "$(DB_URL)" down 1

# show current version
migrate-version:
	$(MIGRATE) -path $(MIGRATIONS_DIR) -database "$(DB_URL)" version
