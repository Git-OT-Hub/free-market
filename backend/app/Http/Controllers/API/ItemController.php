<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\Controller;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use App\Http\Requests\ItemRequest;
use App\Models\Item;

class ItemController extends Controller
{
    public function store(ItemRequest $request)
    {
        DB::transaction(function () use($request) {
            $filename = "";

            // 画像が添付されてフォームから送信された場合、ストレージへ添付画像を保存
            if ($request->hasFile("image")) {
                // 画像のリサイズ処理、ファイル名作成、ストレージへ保存
                $file = $request->file("image");
                $imageFile = Image::read($file);
                $imageFile->coverDown(400, 400);
                $filename = 'itemImages/' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                Storage::disk("public")->put($filename, $imageFile->encode());
            }

            // itemsテーブルへ保存
            $item = Item::create([
                'user_id' => Auth::id(),
                'name' => $request->name,
                'brand' => $request->brand,
                'description' => $request->description,
                'price' => $request->price,
                'state' => $request->state,
                'image' => $filename,
            ]);

            // category_itemsテーブルへ保存
            foreach ($request->category_id as $num) {
                $item->categories()->attach($num);
            }
        });

        return response()->json("", Response::HTTP_CREATED);
    }

    public function index()
    {
        if (Auth::user()) {
            $filteredItems = Item::where('user_id', '!=', Auth::id())->get();

            $responseFilteredItems = $filteredItems->map(function($filteredItem) {
                return [
                    "id" => $filteredItem->id,
                    "name" => $filteredItem->name,
                    "image" => $filteredItem->image,
                    "sold_at" => $filteredItem->sold_at,
                ];
            });

            $response = [
                "items" => $responseFilteredItems,
            ];

            return response()->json($response, Response::HTTP_OK);
        } else {
            $items = Item::all();

            $responseItems = $items->map(function($item) {
                return [
                    "id" => $item->id,
                    "name" => $item->name,
                    "image" => $item->image,
                    "sold_at" => $item->sold_at,
                ];
            });

            $response = [
                "items" => $responseItems,
            ];

            return response()->json($response, Response::HTTP_OK);
        }
    }

    public function show($id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json("", Response::HTTP_NO_CONTENT);
        }

        if ($item->user_id === Auth::id()) {
            return response()->json("", Response::HTTP_UNAUTHORIZED);
        }

        // カテゴリー取得
        $categories = $item->getCategories();
        // 商品の状態を文字列へ変換
        $state = $item->convertStateToString();
        // 商品に対するいいねの有無
        $isLike = $item->isLike();
        // 商品に対するいいねの数
        $likesCount = $item->likesCount();

        $response = [
            "id" => $item->id,
            "name" => $item->name,
            "brand" => $item->brand,
            "description" => $item->description,
            "price" => $item->price,
            "state" => $state,
            "image" => $item->image,
            "sold_at" => $item->sold_at,
            "categories" => $categories,
            "is_like" => $isLike,
            "likes_count" => $likesCount,
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    public function like($id)
    {
        if (!Auth::user()) {
            return response()->json("", Response::HTTP_UNAUTHORIZED);
        }

        $item = Item::find($id);
        if (!$item) {
            return response()->json("", Response::HTTP_NO_CONTENT);
        }

        $isExists = $item->users()->where('user_id', Auth::id())->exists();
        if ($isExists) {
            return response()->json("", Response::HTTP_BAD_REQUEST);
        }

        $item->users()->attach(Auth::id());

        // カテゴリー取得
        $categories = $item->getCategories();
        // 商品の状態を文字列へ変換
        $state = $item->convertStateToString();
        // 商品に対するいいねの有無
        $isLike = $item->isLike();
        // 商品に対するいいねの数
        $likesCount = $item->likesCount();

        $response = [
            "id" => $item->id,
            "name" => $item->name,
            "brand" => $item->brand,
            "description" => $item->description,
            "price" => $item->price,
            "state" => $state,
            "image" => $item->image,
            "sold_at" => $item->sold_at,
            "categories" => $categories,
            "is_like" => $isLike,
            "likes_count" => $likesCount,
        ];

        return response()->json($response, Response::HTTP_CREATED);
    }

    public function unlike($id)
    {
        if (!Auth::user()) {
            return response()->json("", Response::HTTP_UNAUTHORIZED);
        }

        $item = Item::find($id);
        if (!$item) {
            return response()->json("", Response::HTTP_NO_CONTENT);
        }

        $isExists = $item->users()->where('user_id', Auth::id())->exists();
        if (!$isExists) {
            return response()->json("", Response::HTTP_BAD_REQUEST);
        }

        $item->users()->detach(Auth::id());

        // カテゴリー取得
        $categories = $item->getCategories();
        // 商品の状態を文字列へ変換
        $state = $item->convertStateToString();
        // 商品に対するいいねの有無
        $isLike = $item->isLike();
        // 商品に対するいいねの数
        $likesCount = $item->likesCount();

        $response = [
            "id" => $item->id,
            "name" => $item->name,
            "brand" => $item->brand,
            "description" => $item->description,
            "price" => $item->price,
            "state" => $state,
            "image" => $item->image,
            "sold_at" => $item->sold_at,
            "categories" => $categories,
            "is_like" => $isLike,
            "likes_count" => $likesCount,
        ];

        return response()->json($response, Response::HTTP_OK);
    }
}
