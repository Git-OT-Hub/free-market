<x-mail::message>
# {{ $seller->name }} 様

出品していた下記の商品の取引が完了しました。

- **商品名**：{{ $item->name }}
- **値段**：¥ {{ number_format($item->price) }}（税込）
- **購入者**：{{ $buyer->name }} 様

<x-mail::button :url="'http://localhost:5173'">
フリマアプリを開く
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
