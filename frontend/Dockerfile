FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# キャッシュ利用で効率化するために別でコピー
COPY package.json package-lock.json ./

# ソースコードをコピー
COPY . .

# 依存関係をインストール
RUN npm install

# アプリケーションをビルド
RUN npm run build

RUN npm install -g pnpm

# ポート番号を指定
EXPOSE 3000

# アプリケーションを起動
CMD ["pnpm","run","dev"]