<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\Controller;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\ProfileRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class ProfileController extends Controller
{
    public function getProfile()
    {
        $profile = Auth::user()->profile;
        $userName = Auth::user()->name;
        $response = [
            'profile' => $profile,
            'userName' => $userName,
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    public function update(ProfileRequest $request)
    {
        DB::transaction(function () use($request) {
            $filename = "";

            // 画像が添付されてフォームから送信された場合、ストレージへ添付画像を保存
            if ($request->hasFile("image")) {
                // 既存の画像があれば削除
                if ($currentImage = Auth::user()->profile->image) {
                    Storage::disk("public")->delete($currentImage);
                }

                // 画像のリサイズ処理、ファイル名作成、ストレージへ保存
                $file = $request->file("image");
                $imageFile = Image::read($file);
                $imageFile->coverDown(200, 200);
                $filename = 'profileImages/' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                Storage::disk("public")->put($filename, $imageFile->encode());
            }

            Auth::user()->update([
                "name" => $request->name,
            ]);

            if ($filename) {
                Auth::user()->profile()->update([
                    "post_code" => $request->post_code,
                    "address" => $request->address,
                    "building" => $request->building,
                    "image" => $filename,
                ]);
            }

            Auth::user()->profile()->update([
                "post_code" => $request->post_code,
                "address" => $request->address,
                "building" => $request->building,
            ]);
        });

        return response()->json("", Response::HTTP_CREATED);
    }

    public function shippingAddressUpdate(ProfileRequest $request)
    {
        Auth::user()->profile()->update([
            "post_code" => $request->post_code,
            "address" => $request->address,
            "building" => $request->building,
        ]);

        return response()->json("", Response::HTTP_CREATED);
    }

    public function getMyItems()
    {
        $profile = Auth::user()->profile;
        $userName = Auth::user()->name;
        $exhibitList = Auth::user()->exhibitList;
        $purchaseList = Auth::user()->purchaseList;

        $response = [
            'profileImage' => $profile->image,
            'userName' => $userName,
            'exhibitList' => $exhibitList,
            'purchaseList' => $purchaseList,
        ];

        return response()->json($response, Response::HTTP_OK);
    }
}
