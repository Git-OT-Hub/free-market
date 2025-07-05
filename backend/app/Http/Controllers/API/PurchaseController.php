<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Item;
use App\Enums\PaymentMethod;
use App\Http\Requests\PurchaseRequest;

class PurchaseController extends Controller
{
    public function create($id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json("", Response::HTTP_NO_CONTENT);
        }

        if (!Auth::user() || $item->user_id === Auth::id()) {
            return response()->json("", Response::HTTP_UNAUTHORIZED);
        }

        if ($item->sold_at) {
            return response()->json("sold", Response::HTTP_BAD_REQUEST);
        }

        // 支払い方法の取得
        $paymentMethods = $this->getPaymentMethod();
        // ユーザーのプロフィールに登録している配送先情報取得
        $shippingAddress = Auth::user()->getShippingAddress();

        $response = [
            "id" => $item->id,
            "name" => $item->name,
            "price" => $item->price,
            "image" => $item->image,
            "payment_methods" => $paymentMethods,
            "shipping_address" => $shippingAddress,
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    public function getPaymentMethod()
    {
        $paymentMethods = PaymentMethod::cases();
        $response = array_map(function ($paymentMethod) {
            return [
                "value" => $paymentMethod->value,
                "label" => $paymentMethod->label(),
            ];
        }, $paymentMethods);

        return $response;
    }

    public function store(PurchaseRequest $request, $id)
    {
        return response()->json("", Response::HTTP_CREATED);
    }
}
