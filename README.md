# フリーマーケット

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
3. .env.example ファイルから .env を作成し、環境変数を変更
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

## URL
- 開発環境：http://localhost:5173
- phpMyAdmin：http://localhost:8080/
- mailhog：http://localhost:8025