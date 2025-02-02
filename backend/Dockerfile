# Go実行環境を使用
FROM golang:1.21-alpine

WORKDIR /app

# 依存関係のファイルをコピー
COPY go.mod go.sum ./
RUN go mod download

# ソースコードをコピー
COPY . .

# ポート設定
ENV PORT=8080
EXPOSE 8080

# go runで直接実行
CMD ["go", "run", "./cmd/main.go"]