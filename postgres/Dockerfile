FROM postgres:16

# プラットフォームを指定
ARG TARGETPLATFORM=linux/amd64

# タイムゾーンを日本時間に設定
ENV TZ=Asia/Tokyo

# 初期化スクリプトをコピー
COPY ./postgres_init /docker-entrypoint-initdb.d/

# 設定ファイルをコピー
COPY ./config /etc/postgresql/

# デフォルトのポートを設定
EXPOSE 5432

# PostgreSQLのデフォルトユーザー、データベース、パスワードを設定
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=db
