<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Auth\RegisteredUserController;
use App\Http\Controllers\API\Auth\AuthenticatedSessionController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\PurchaseController;
use App\Http\Controllers\API\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
// 商品
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{id}', [ItemController::class, 'show']);
// 商品購入後のデータ保存
Route::post('/items/purchase/webhook/stripe', [PurchaseController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::middleware(['verified'])->group(function() {
        // プロフィール
        Route::get('/profile', [ProfileController::class, 'getProfile']);
        Route::post('/profile/update', [ProfileController::class, 'update']);
        Route::get('/profile/my_items', [ProfileController::class, 'getMyItems']);
        // カテゴリー取得
        Route::get('/categories', [CategoryController::class, 'getCategories']);
        // 商品
        Route::post('/items', [ItemController::class, 'store']);
        // いいね
        Route::post('/items/{id}/like', [ItemController::class, 'like']);
        Route::delete('/items/{id}/like', [ItemController::class, 'unlike']);
        // コメント
        Route::post('/items/{id}/comment', [ItemController::class, 'createComment']);
        // 商品購入
        Route::get('/items/{id}/purchase/create', [PurchaseController::class, 'create']);
        Route::post('/items/{id}/purchase/checkout', [PurchaseController::class, 'createCheckoutSession']);
        // 配送先住所変更
        Route::post('/profile/address/update', [ProfileController::class, 'shippingAddressUpdate']);
        // チャット登録
        Route::post('/transaction/chat/create', [TransactionController::class, 'createChat']);
        // 取引画面
        Route::get('/transaction/{id}/contents', [TransactionController::class, 'contents']);
        // チャット編集
        Route::post('/transaction/chat/update', [TransactionController::class, 'updateChat']);
        // チャット削除
        Route::delete('/transaction/chat/{id}/delete', [TransactionController::class, 'deleteChat']);
        // 取引評価
        Route::post('/transaction/complete', [TransactionController::class, 'complete']);
    });
});