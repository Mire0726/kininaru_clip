# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# pnpmのインストール
RUN npm install -g pnpm

# 依存関係ファイルのコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係のインストール（開発依存を含む）
RUN pnpm install --frozen-lockfile

# ソースコードのコピー
COPY . .

# アプリケーションのビルド
RUN pnpm run build

# Production stage
FROM node:18-alpine AS runner 

WORKDIR /app

# 必要なファイルのコピー
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 本番環境用の依存関係のみインストール
RUN pnpm install --frozen-lockfile 

# 環境変数の設定
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# 本番サーバーの起動
CMD ["pnpm", "run", "start"]
