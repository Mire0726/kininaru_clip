# キニナルクリップ (kininaru_clip)

行きたい場所・飲食店・ホテル ── あなたの"気になる"を共有しよう。

キニナルクリップは、旅行やお出かけの計画で「行きたい場所」「気になっているお店」をグループでまとめて共有できるWebサービスです。
Google マップのURLを貼るだけで、AIがお店の特徴を要約し、近くの似たお店もおすすめします。

## 主な機能

- **グループ作成**
  タイトル（例：「九州旅行」）とメンバー名を登録してグループを作成。発行されたURLをメンバーに共有するだけで使えます（ログイン不要）。
- **アイデア（行きたい場所）の登録**
  タイトル・Google マップのURL・メモを登録。アイデアは以下のタグで分類されます。
  - 観光地 (`location`)
  - 飲食店 (`restaurant`)
  - ホテル (`hotel`)
  - その他 (`other`)
- **いいね**
  メンバー同士で「行きたい！」をいいねで表現できます。
- **AI要約**
  アイデア登録時に、Google マップの情報（ジャンル・評価・口コミ）をもとに、LLMが「ジャンル／雰囲気／おすすめ」を短くカジュアルに要約し、★評価とともに表示します。
- **AIおすすめ**
  登録したお店と似た系統の近隣スポットを Google Places API で検索し、評価・口コミ数をもとにランキング（RRF）して上位をおすすめします。

## アーキテクチャ

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  frontend    │ ──▶ │  api         │ ──▶ │  ai-engine   │ ──▶ OpenAI API
│  Next.js     │     │  Go (Echo)   │     │  FastAPI     │ ──▶ Google Maps API
│  :3000       │     │  :8080       │     │  :8000       │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                     ┌──────▼───────┐
                     │  PostgreSQL  │
                     │  :5432       │
                     └──────────────┘
```

| ディレクトリ | 内容 | 主な技術 |
| --- | --- | --- |
| `frontend/` | Webフロントエンド | Next.js 15, React 18, Chakra UI, TanStack Query, axios |
| `backend/` | REST API サーバー | Go 1.21, Echo, GORM, zap |
| `ai_engine/` | 要約・おすすめ生成 | Python 3.11, FastAPI, OpenAI API (`gpt-4.1-nano`), googlemaps, uv |
| `postgres/` | DB の Dockerfile・初期化SQL・pgAdmin 設定 | PostgreSQL |
| `migrations/` | マイグレーションファイル | golang-migrate |
| `docs/` | API仕様書 (OpenAPI) | Swagger UI |

## データモデル

| テーブル | 説明 |
| --- | --- |
| `events` | グループ（旅行・お出かけの単位） |
| `users` | グループのメンバー |
| `ideas` | 行きたい場所・お店（タグ・いいね数・要約・メモを保持） |
| `recommends` | アイデアに紐づくAIおすすめ |

## 開発環境のセットアップ

### 前提

- Docker / Docker Compose
- （マイグレーションを使う場合）golang-migrate: `brew install golang-migrate`

### 環境変数

`ai_engine/.env` を作成し、以下を設定してください。

```env
OPENAI_API_KEY=your-openai-api-key
GOOGLEMAP_API_KEY=your-google-maps-api-key
```

### 起動

```sh
# ビルドして起動
make build

# 起動 / 停止
make up
make down
```

起動後、以下のURLにアクセスできます。

| サービス | URL |
| --- | --- |
| フロントエンド | http://localhost:3000 |
| API サーバー | http://localhost:8080 |
| AI エンジン | http://localhost:8000 |
| Swagger UI (API仕様書) | http://localhost:8081 |
| pgAdmin | http://localhost:80 |

### マイグレーション

```sh
make new-migration name=create_table  # マイグレーションファイルを作成
make migrate-up                       # 適用
make migrate-down                     # 1つ戻す
make migrate-version                  # 現在のバージョンを表示
```

## API

API仕様は [`docs/api-document.yaml`](docs/api-document.yaml) を参照してください（Swagger UI で閲覧可能）。

| メソッド | パス | 説明 |
| --- | --- | --- |
| `POST` | `/events` | グループ作成 |
| `GET` | `/events/{eventId}` | グループ取得 |
| `POST` / `GET` | `/events/{eventId}/users` | メンバーの追加・一覧取得 |
| `POST` | `/events/{eventId}/ideas` | アイデア登録（URLがあればAI要約も自動生成） |
| `GET` | `/events/{eventId}/ideas` | アイデア一覧（タグ別） |
| `GET` / `PUT` / `DELETE` | `/events/{eventId}/ideas/{ideaId}` | アイデアの取得・更新・削除 |
| `PUT` | `/events/{eventId}/ideas/{ideaId}/likes` | いいね |
| `GET` | `/events/{eventId}/ideas/{ideaId}/recommends` | AIおすすめの取得 |

AIエンジン（`:8000`）は `POST /summaries`（要約）と `POST /recommends`（おすすめ）を提供し、API サーバーから呼び出されます。
