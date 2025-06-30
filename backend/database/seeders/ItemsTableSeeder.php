<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $params = [
            [
                "user_id" => 1,
                "name" => "腕時計",
                "description" => "スタイリッシュなデザインのメンズ腕時計",
                "price" => 15000,
                "state" => 1,
                "image" => "dummyImages/wristwatch.jpg",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "user_id" => 1,
                "name" => "HDD",
                "description" => "高速で信頼性の高いハードディスク",
                "price" => 5000,
                "state" => 2,
                "image" => "dummyImages/hardDisk.jpg",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "user_id" => 2,
                "name" => "玉ねぎ3束",
                "description" => "新鮮な玉ねぎ3束のセット",
                "price" => 300,
                "state" => 3,
                "image" => "dummyImages/onion.jpg",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "user_id" => 2,
                "name" => "革靴",
                "description" => "クラシックなデザインの革靴",
                "price" => 4000,
                "state" => 4,
                "image" => "dummyImages/leatherShoes.jpg",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "user_id" => 3,
                "name" => "ノートPC",
                "description" => "高性能なノートパソコン",
                "price" => 45000,
                "state" => 1,
                "image" => "dummyImages/laptopComputer.jpg",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "user_id" => 3,
                "name" => "マイク",
                "description" => "高音質のレコーディング用マイク",
                "price" => 8000,
                "state" => 2,
                "image" => "dummyImages/microphone.jpg",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "user_id" => 4,
                "name" => "ショルダーバッグ",
                "description" => "おしゃれなショルダーバッグ",
                "price" => 3500,
                "state" => 3,
                "image" => "dummyImages/shoulderBag.jpg",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "user_id" => 4,
                "name" => "タンブラー",
                "description" => "使いやすいタンブラー",
                "price" => 500,
                "state" => 4,
                "image" => "dummyImages/tumbler.jpg",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "user_id" => 5,
                "name" => "コーヒーミル",
                "description" => "手動のコーヒーミル",
                "price" => 4000,
                "state" => 1,
                "image" => "dummyImages/coffeeMill.jpg",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "user_id" => 5,
                "name" => "メイクセット",
                "description" => "便利なメイクアップセット",
                "price" => 2500,
                "state" => 2,
                "image" => "dummyImages/makeupSet.jpg",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
        ];

        foreach ($params as $param) {
            DB::table('items')->insert($param);
        }
    }
}
