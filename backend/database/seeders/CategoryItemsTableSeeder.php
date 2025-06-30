<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class CategoryItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $params = [
            [
                "category_id" => 1,
                "item_id" => 1,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 5,
                "item_id" => 1,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 12,
                "item_id" => 1,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 8,
                "item_id" => 2,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 11,
                "item_id" => 3,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 1,
                "item_id" => 4,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 5,
                "item_id" => 4,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 2,
                "item_id" => 5,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 2,
                "item_id" => 6,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 1,
                "item_id" => 7,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 4,
                "item_id" => 7,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 12,
                "item_id" => 7,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 10,
                "item_id" => 8,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 10,
                "item_id" => 9,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 4,
                "item_id" => 10,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "category_id" => 6,
                "item_id" => 10,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
        ];

        foreach ($params as $param) {
            DB::table('category_items')->insert($param);
        }
    }
}
