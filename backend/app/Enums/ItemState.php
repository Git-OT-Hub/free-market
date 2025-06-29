<?php

namespace App\Enums;

enum ItemState: int
{
    case GREAT = 1;
    case GOOD = 2;
    case FAIR = 3;
    case POOR = 4;

    /**
     * 商品状態の日本語を取得
     * @return string
     */
    public function label(): string
    {
        return match($this)
        {
            self::GREAT => '良好',
            self::GOOD => '目立った傷や汚れなし',
            self::FAIR => 'やや傷や汚れあり',
            self::POOR => '状態が悪い',
        };
    }
}