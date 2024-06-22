# 概要

Next.jsとPostgreSQLとPrismaで作ったお問合せフォームです。

# 環境構築

`.env`に以下の情報を追加

```sh
DATABASE_URL="postgresql://admin:password@db:5432/mydb?schema=public"
DB_HOST=db
DB_NAME=mydb
DB_USER=admin
DB_PASS=password
DB_PORT=3232
NEXTJS_PORT=3131
```

`node_moules`を以下のコマンドでインストール

```sh
docker compose run --rm app npm i
```

`node_modules`がインストールできたら以下のコマンドでコンテナを起動

```sh
docker compose up -d
```
