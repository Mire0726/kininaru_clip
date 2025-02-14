FROM python:3.11-slim-buster

# uv のインストール
RUN pip install uv

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync

COPY . /app
# ポートの公開 (FastAPI アプリがポートを使用する場合)
EXPOSE 8000

# コマンドの定義 (FastAPI アプリケーションの起動)
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]