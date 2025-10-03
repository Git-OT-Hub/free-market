<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Chat extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'purchase_id',
        'user_id',
        'receiver_id',
        'message',
        'image',
    ];

    /**
     * チャットに紐づく購入履歴を取得するリレーション
     *
     * @return BelongsTo<\App\Models\Purchase>
     */
    public function purchase(): BelongsTo
    {
        return $this->belongsTo(Purchase::class);
    }

    /**
     * チャットに紐づく既読履歴を取得するリレーション
     *
     * @return HasOne<\App\Models\ChatRead>
     */
    public function chatRead(): HasOne
    {
        return $this->hasOne(ChatRead::class);
    }

    /**
     * チャットに紐づくユーザーを取得するリレーション
     *
     * @return BelongsTo<\App\Models\User>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
