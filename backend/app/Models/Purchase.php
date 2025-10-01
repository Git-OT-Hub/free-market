<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'item_id', 'payment_method', 'post_code', 'address', 'building', 'is_transaction_completed'
    ];

    /**
     * 購入履歴に紐づくユーザーを取得するリレーション
     *
     * @return BelongsTo<\App\Models\User>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 購入履歴に紐づく商品を取得するリレーション
     *
     * @return BelongsTo<\App\Models\Item>
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * 購入履歴に紐づくチャットを取得するリレーション
     *
     * @return HasMany<\App\Models\Chat>
     */
    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class);
    }
}
