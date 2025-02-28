# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# pnpmのインストール
RUN npm install -g pnpm

# 依存関係ファイルのコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係のインストール
RUN pnpm install --frozen-lockfile

# ソースコードのコピー
COPY . .

# アプリケーションのビルド
RUN pnpm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# pnpmのインストール
RUN npm install -g pnpm

# 必要なファイルのコピー
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# 環境変数の設定
ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

# 開発サーバーの起動
CMD ["pnpm", "run", "start"]