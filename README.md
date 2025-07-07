# フリーマーケット

## ご報告
時間が足りず、テストコードの実装ができていない状態です。
申し訳ございません。

## 環境構築
### Dockerビルド
1. git clone git@github.com:Git-OT-Hub/free-market.git
2. docker compose up -d --build

※ MySQL, phpMyAdmin, mailhog は、OSによって起動しない場合があるため、それぞれのPCに合わせて docker-compose.yml ファイルを編集してください。

> *MacのM1・M2チップのPCの場合、エラーメッセージが表示されビルドができないことがあります。
エラーが発生する場合は、docker-compose.ymlファイルの「mysql」「phpmyadmin」「mailhog」内に「platform」の項目を追加で記載してください*
```
例）
mysql:
    image: "mysql:8.0"
    platform: linux/amd64
```

### Laravel環境構築
1. docker compose exec backend bash
2. composer install
3. `backend/.env.example` ファイルから `.env` を作成し、環境変数を設定（下記をコピーして貼り付けてください）
``` text
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=laravel_pass

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=cookie
SESSION_LIFETIME=120
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:5173
FRONTEND_URL=http://localhost:5173

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="free-market@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

STRIPE_KEY=
STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET=
```
4. アプリケーションキーの作成
```
php artisan key:generate
```
5. マイグレーションの実行
```
php artisan migrate
```
6. シーディングの実行
```
php artisan db:seed
```
7. `public/storage` から `storage/app/public` へのシンボリックリンクを作成
```
php artisan storage:link
```

### stripe環境構築
1. 下記にアクセスしてstripeのアカウントを作成
  - https://stripe.com/jp
2. APIキーの取得
  - stripeのダッシュボードの 開発者 > APIキー から「`公開可能キー`」、「`シークレットキー`」を取得
  - APIキーは`テスト用`を使用すること（キーの最初の方に「`_test_`」が含まれています）
3. `backend/.env` に取得したAPIキーを登録
  - STRIPE_KEY=公開可能キー
  - STRIPE_SECRET=シークレットキー
4. `docker-compose.yml` と同じ階層に `.env` を作成し、取得したAPIキーを登録
  - STRIPE_KEY=公開可能キー
  - STRIPE_SECRET=シークレットキー
5. Docker再構築
```
docker compose down
docker compose up --build -d
```
6. Stripe CLI に対する認証を実行
```
docker compose exec stripe sh
stripe login
ターミナル上にURLが表示されるため、そこからアクセスして認証を実施してください
```
7. Webhook署名シークレットキーの取得
```
docker compose exec stripe sh
stripe listen --forward-to nginx:80/api/items/purchase/webhook/stripe
上記コマンドを実行することで、ターミナル上にWebhook署名シークレットキー（whsec・・・）が表示される
```
8. `backend/.env` に取得したWebhook署名シークレットキーを登録
  - STRIPE_WEBHOOK_SECRET=Webhook署名シークレットキー
9. Docker再構築
```
docker compose down
docker compose up --build -d
```
10. StripのWebhookイベントをモニタリングする
```
docker compose exec stripe sh
stripe listen --forward-to nginx:80/api/items/purchase/webhook/stripe
※ 起動させておく。起動させておかないと、stripeの決済完了時に購入した商品情報等が purchasesテーブル に登録されなくなる。
※ モニタリングを停止する場合、Macだと control + C
```
11. stripeでカード決済をする場合は、テスト用のクレジットカード番号を使用
```
例）
MasterCard
5555555555554444
```

### react環境構築
※ 上記でDockerをビルドした際、frontendコンテナ側で自動的に下記コマンドを実行しているため、特に構築は不要です。
```
npm install
npm run dev
```
※ frontendコンテナ内に入る場合は、下記コマンドを実行してください。
```
docker compose exec frontend sh
```

### ログインに関して
シーダーファイルを流すと自動でユーザーが作成されます。
作成されたユーザーでログインする場合は、下記の通りになります。
```
メールアドレス：phpMyAdmin > users テーブルにある email を使用
パスワード：password
```

## ER図
[![Image from Gyazo](https://i.gyazo.com/0ff0fae30b4c9b6aa5ab4189ab9c35ff.png)](https://gyazo.com/0ff0fae30b4c9b6aa5ab4189ab9c35ff)

## 使用技術
### フロントエンド
- React 19.1.0
- TypeScript 5.8.3
### バックエンド
- PHP 8.2
- Laravel 10.48.29
### DB
- MySQL 8.0
### API
- Stripe

## URL
- 開発環境：http://localhost:5173
- phpMyAdmin：http://localhost:8080/
- mailhog：http://localhost:8025