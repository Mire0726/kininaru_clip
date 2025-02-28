# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# 必要なファイルのコピー
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 本番環境用の依存関係のみインストール
RUN pnpm install --frozen-lockfile --prod

# 環境変数の設定
ARG ENV_FILE=.env.stg
ENV NODE_ENV=production
ENV PORT=3000

# Render にアップロードしない .env をコピー
COPY ${ENV_FILE} .env

EXPOSE 3000

# 本番サーバーの起動
CMD ["pnpm", "run", "start"]
