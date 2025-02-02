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
