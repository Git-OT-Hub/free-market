<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\Controller;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Item;
use App\Models\Purchase;
use App\Enums\PaymentMethod;
use App\Http\Requests\PurchaseRequest;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Webhook;
use Stripe\PaymentIntent;
use Illuminate\Support\Facades\DB;

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

    public function createCheckoutSession(PurchaseRequest $request, $id)
    {
        define("CONVENIENCE_STORE", 1);
        define("CARD", 2);

        $item = Item::find($id);

        Stripe::setApiKey(config('services.stripe.secret'));

        if ((int)$request->payment_method === CARD) {
            $checkoutSession = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'jpy',
                        'product_data' => [
                            'name' => $item->name,
                        ],
                        'unit_amount' => $item->price,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => config('app.frontend_url'),
                'cancel_url' => config('app.frontend_url') . "/item/{$item->id}",
                'payment_intent_data' => [
                    'metadata' => [
                        'item_id' => $item->id,
                        'user_id' => Auth::id(),
                        'payment_method' => $request->payment_method,
                        'post_code' => $request->post_code,
                        'address' => $request->address,
                        'building' => $request->building ?? '',
                    ],
                ],
            ]);

            return response()->json([
                'id' => $checkoutSession->id,
                'publicKey' => config('services.stripe.key'),
            ], Response::HTTP_OK);
        }

        if ((int)$request->payment_method === CONVENIENCE_STORE) {
            $checkoutSession = Session::create([
                'payment_method_types' => ['konbini'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'jpy',
                        'product_data' => [
                            'name' => $item->name,
                        ],
                        'unit_amount' => $item->price,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => config('app.frontend_url'),
                'cancel_url' => config('app.frontend_url') . "/item/{$item->id}",
                'payment_intent_data' => [
                    'metadata' => [
                        'item_id' => $item->id,
                        'user_id' => Auth::id(),
                        'payment_method' => $request->payment_method,
                        'post_code' => $request->post_code,
                        'address' => $request->address,
                        'building' => $request->building ?? '',
                    ],
                ],
            ]);

            return response()->json([
                'id' => $checkoutSession->id,
                'publicKey' => config('services.stripe.key'),
            ], Response::HTTP_OK);
        }
    }

    public function store(Request $request)
    {
        define("CONVENIENCE_STORE", 1);
        define("CARD", 2);

        Stripe::setApiKey(config('services.stripe.secret'));

        $payload = $request->getContent();
        $sigHeader = $request->header('stripe-signature');
        $secret = config('services.stripe.webhook_secret');

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $secret);
        } catch (\Exception $e) {
            return response()->json("error Webhook", Response::HTTP_BAD_REQUEST);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $paymentIntentId = $session->payment_intent;
            $paymentIntent = PaymentIntent::retrieve($paymentIntentId);
            $metadata = $paymentIntent->metadata;

            $exists = Purchase::where('user_id', $metadata['user_id'])
                ->where('item_id', $metadata['item_id'])
                ->exists();

            if ($exists) {
                return;
            }

            if ((int)$metadata['payment_method'] === CONVENIENCE_STORE) {
                DB::transaction(function () use($metadata) {
                    Item::find($metadata['item_id'])->update([
                        'sold_at' => now(),
                    ]);

                    Purchase::create([
                        'user_id' => $metadata['user_id'],
                        'item_id' => $metadata['item_id'],
                        'payment_method' => $metadata['payment_method'],
                        'post_code' => $metadata['post_code'],
                        'address' => $metadata['address'],
                        'building' => $metadata['building'] ?? null,
                        'is_transaction_completed' => false,
                    ]);
                });
            }
        }

        if ($event->type === 'payment_intent.succeeded') {
            $paymentIntent = $event->data->object;
            $metadata = $paymentIntent->metadata;

            $exists = Purchase::where('user_id', $metadata['user_id'])
                ->where('item_id', $metadata['item_id'])
                ->exists();

            if ($exists) {
                return;
            }

            if ((int)$metadata['payment_method'] === CARD) {
                DB::transaction(function () use($metadata) {
                    Item::find($metadata['item_id'])->update([
                        'sold_at' => now(),
                    ]);

                    Purchase::create([
                        'user_id' => $metadata['user_id'],
                        'item_id' => $metadata['item_id'],
                        'payment_method' => $metadata['payment_method'],
                        'post_code' => $metadata['post_code'],
                        'address' => $metadata['address'],
                        'building' => $metadata['building'] ?? null,
                        'is_transaction_completed' => false,
                    ]);
                });
            }
        }
    }
}
