<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $params = [
            [
                "content" => "ファッション",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "家電",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "インテリア",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "レディース",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "メンズ",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "コスメ",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "本",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "ゲーム",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "スポーツ",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "キッチン",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "ハンドメイド",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "アクセサリー",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "おもちゃ",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "content" => "ベビー・キッズ",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
        ];

        foreach ($params as $param) {
            DB::table('categories')->insert($param);
        }
    }
}
