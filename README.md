# フリーマーケット

## ご報告
時間が足りず、テストコードの実装ができていない状態です。
申し訳ございません。

## 環境構築(上から順番にお願いします)
### リモートリポジトリからソースコードを取得
```
git clone git@github.com:Git-OT-Hub/free-market.git
```

### stripe環境構築(その1)
1. 下記にアクセスしてstripeのアカウントを作成
  - https://stripe.com/jp
2. APIキーの取得
  - stripeのダッシュボードの 開発者 > APIキー から「`公開可能キー`」、「`シークレットキー`」を取得
  - APIキーは`テスト用`を使用すること（キーの最初の方に「`_test_`」が含まれています）
3. `backend/.env` を作成し、環境変数を設定（下記をコピーして貼り付けてください）
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
4. `backend/.env` に取得したAPIキーを`登録`
```
STRIPE_KEY=公開可能キー
STRIPE_SECRET=シークレットキー
```
5. `docker-compose.yml` と同じ階層に `.env` を`作成`し、取得したAPIキー`のみを登録`
```
STRIPE_KEY=公開可能キー
STRIPE_SECRET=シークレットキー
```

### Dockerビルド
```
docker compose up -d --build
```

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
1. backendコンテナに入る
```
(docker-compose.yml と同じ階層で実行し backendコンテナに入る)
docker compose exec backend bash
```
2. 依存関係のライブラリをインストール
```
composer install
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
8. backendコンテナから抜ける

### stripe環境構築(その2)
1. Stripe CLI に対する認証を実行
```
(docker-compose.yml と同じ階層で実行し stripeコンテナに入る)
docker compose exec stripe sh
stripe login
ターミナル上にURLが表示されるため、そこからアクセスして認証を実施してください
```
2. Webhook署名シークレットキーの取得
```
※ stripeコンテナに入っている状態で下記コマンドを実行
stripe listen --forward-to nginx:80/api/items/purchase/webhook/stripe
ターミナル上にWebhook署名シークレットキー（whsec・・・）が表示される
```
3. `backend/.env` に取得したWebhook署名シークレットキーを登録
```
STRIPE_WEBHOOK_SECRET=Webhook署名シークレットキー
```
4. stripeコンテナから抜ける
```
control + C で stripe listen を停止（Macの場合）
exit でコンテナから抜ける
```
5. Docker再構築
```
(docker-compose.yml と同じ階層で実行)
docker compose down
docker compose up --build -d
```
6. StripのWebhookイベントをモニタリングする
```
(docker-compose.yml と同じ階層で実行し stripeコンテナに入る)
docker compose exec stripe sh
stripe listen --forward-to nginx:80/api/items/purchase/webhook/stripe
※ 起動させておく。
※ stripe側で決済が完了した際、購入した商品情報等のデータが送信されてくるため、そのデータを受け取り、 purchasesテーブル にそのデータを登録するよう実装している。
※ モニタリングを停止する場合、Macだと control + C
```
7. stripeでカード決済をする場合は、テスト用のクレジットカード番号を使用
```
例）
MasterCard
5555555555554444
```

### react環境構築
※ 上記でDockerをビルドした際、frontendコンテナ側で自動的に下記コマンドを実行しているため、特に`構築は不要`です。
```
npm install
npm run dev
```
※ frontendコンテナ内に入る場合は、下記コマンドを実行してください。
```
docker compose exec frontend sh
```

### 認証機能の一部不具合について
時々、ユーザー登録や別ユーザーでログインした際、エラーメッセージが表示され、うまくいかない場合がございます。
ログアウトをした際、バックエンド側で laravel_session を削除していますが、その更新結果が
ブラウザ側のCookieに保存している laravel_session にうまく反映されず、起きている現象だと推測しています。
その場合は、Google Chrome であれば、検証画面を開いた状態で、ブラウザの再読み込みボタンを右クリックして「キャッシュの削除とハード再読み込み」等を
実施していただくことで解消します。

### ログインに関して
seederファイルを流すと自動でユーザーが作成されます。
作成されたユーザーでログインする場合は、下記の通りになります。
1. メールアドレスの取得
  - http://localhost:8080/ にアクセスして usersテーブルにある任意の email を取得
2. パスワードの取得
```
パスワードは下記の通りです。どのユーザーも同じパスワードです。
password
```
※ ユーザー登録で、自分で作成してログインしても問題ございません。
※ アプリのURLは下記の URL > 開発環境 になります。

### Seederで作成されるダミーデータについて
ユーザーのダミーデータは3つ作成されます。  
ユーザーとユーザーに紐づく商品データは下記の通りです。
```
ユーザーID: 1
CO01〜CO05の商品データ（Proテスト 案件シートの「ダミーデータ」参照）

ユーザーID: 2
CO06〜CO10の商品データ（Proテスト 案件シートの「ダミーデータ」参照）

ユーザーID: 3
商品データの紐付けなし
```

## ER図
[![Image from Gyazo](https://i.gyazo.com/77ab7af4b4feed8c28ce763e1ab3fe5a.png)](https://gyazo.com/77ab7af4b4feed8c28ce763e1ab3fe5a)

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