<?php

namespace App\Enums;

enum PaymentMethod: int
{
    case CONVENIENCE_STORE = 1;
    case CARD = 2;

    /**
     * 支払い方法の日本語を取得
     * @return string
     */
    public function label(): string
    {
        return match($this)
        {
            self::CONVENIENCE_STORE => 'コンビニ払い',
            self::CARD => 'カード支払い',
        };
    }
}