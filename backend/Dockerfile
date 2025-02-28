# ビルドステージ
FROM golang:1.21-alpine AS builder

WORKDIR /app

# 依存関係のファイルをコピー
COPY go.mod go.sum ./
RUN go mod download

# ソースコードをコピー
COPY . .

# バイナリをビルド
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/main.go

# 実行ステージ
FROM alpine:latest

WORKDIR /app

# ビルドステージからバイナリをコピー
COPY --from=builder /app/main .

# ポート設定
ENV PORT=8080
EXPOSE 8080

# バイナリを実行
CMD ["./main"]