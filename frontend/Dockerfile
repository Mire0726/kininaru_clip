FROM node:18-alpine

WORKDIR /app

# パッケージマネージャーの設定ファイルをコピー
COPY package.json package-lock.json ./
COPY pnpm-lock.yaml ./

# pnpmのインストールと依存関係のインストール
RUN npm install -g pnpm
RUN pnpm install

# ソースコードをコピー
COPY . .

# 開発サーバーのポートを公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["pnpm", "run", "dev"]