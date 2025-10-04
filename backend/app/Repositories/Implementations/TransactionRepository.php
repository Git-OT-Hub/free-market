<?php

namespace App\Repositories\Implementations;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Contracts\TransactionRepositoryInterface;
use App\Http\Requests\ChatRequest;
use App\Http\Requests\ChatEditRequest;
use App\Models\User;
use App\Models\Item;
use App\Models\Purchase;
use App\Models\Chat;
use App\Models\ChatRead;

class TransactionRepository implements TransactionRepositoryInterface
{
    /**
     * 送信されたチャット内容をDBに保存
     * ユーザー情報、チャット情報、もしくは null を返す
     *
     * @param ChatRequest $request
     * @return array{
     *   user: User,
     *   chat: Chat,
     * }|null
     */
    public function saveChatContent(ChatRequest $request): array|null
    {
        try {
            $res = DB::transaction(function () use($request) {
                $purchase = Purchase::find($request->purchase_id);
                $item = Item::find($purchase->item_id);
                $message = $request->message;
                $user = Auth::user();

                // 画像の保存
                $filename = "";
                if ($request->image) {
                    $filename = $this->saveImage($request->image);
                }

                if ((int)$purchase->user_id === (int)$user->id) {
                    // チャット送信が購入者の場合

                    $sellerId = $item->user_id;
                    // チャット登録
                    $chat = Chat::create([
                        'purchase_id' => $purchase->id,
                        'user_id' => $user->id,
                        'receiver_id' => $sellerId,
                        'message' => $message,
                        'image' =>$filename,
                    ]);
                    // チャット受信者のチャット未読履歴を作成
                    ChatRead::create([
                        'chat_id' => $chat->id,
                        'user_id' => $sellerId,
                        'read_at' => null,
                    ]);

                    return [
                        'user' => $user,
                        'chat' => $chat,
                    ];
                } else if ((int)$item->user_id === (int)$user->id) {
                    // チャット送信が販売者の場合

                    $buyerId = $purchase->user_id;
                    // チャット登録
                    $chat = Chat::create([
                        'purchase_id' => $purchase->id,
                        'user_id' => $user->id,
                        'receiver_id' => $buyerId,
                        'message' => $message,
                        'image' =>$filename,
                    ]);
                    // チャット受信者のチャット未読履歴を作成
                    ChatRead::create([
                        'chat_id' => $chat->id,
                        'user_id' => $buyerId,
                        'read_at' => null,
                    ]);

                    return [
                        'user' => $user,
                        'chat' => $chat,
                    ];
                } else {
                    return null;
                }
            });

            return $res;
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * 画像をストレージへ保存
     * 保存先のパスを文字列で返す
     *
     * @param UploadedFile $file
     * @return string
     */
    private function saveImage(UploadedFile $file): string
    {
        // 画像のリサイズ処理、ファイル名作成、ストレージへ保存
        $imageFile = Image::read($file);
        $imageFile->coverDown(400, 400);
        $filename = 'chatImages/' . Str::random(10) . '.' . $file->getClientOriginalExtension();
        Storage::disk("public")->put($filename, $imageFile->encode());

        return $filename;
    }

    /**
     * 商品情報、取引相手情報、ログインユーザー情報、チャット情報、もしくは null を返す
     *
     * @param string $id
     * @return array{
     *   item: Item,
     *   partner: User,
     *   other_transaction_list: Collection<int, Item>|null,
     *   chats: Collection<int, Chat>|null,
     * }|null
     */
    public function findContents(string $id): array|null
    {
        try {
            $purchase = Purchase::find($id);
            $item = Item::find($purchase->item_id);
            $user = Auth::user();
            $partner = null;
            if ((int)$purchase->user_id === (int)$user->id) {
                // ログインユーザーが購入者の場合
                $partner = User::find($item->user_id);
            } else if ((int)$item->user_id === (int)$user->id) {
                // ログインユーザーが出品者の場合
                $partner = User::find($purchase->user_id);
            }
            // その他の取引商品リストを取得
            $transactionList = $user->transactionList();
            $otherTransactionList = $transactionList->reject(function ($tItem) use ($item) {
                return $tItem->id === $item->id;
            })->values();
            // チャットリスト
            $chats = $purchase->chats()
                ->with(['user.profile'])
                ->orderBy('created_at', 'asc')
                ->get();

            return [
                'item' => $item,
                'partner' => $partner,
                'other_transaction_list' => $otherTransactionList,
                'chats' => $chats,
            ];
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * チャット内容を編集
     * ユーザー情報、チャット情報、もしくは null を返す
     *
     * @param ChatEditRequest $request
     * @return array{
     *   user: User,
     *   chat: Chat,
     * }|null
     */
    public function fixChatContent(ChatEditRequest $request): array|null
    {
        try {
            $res = DB::transaction(function () use($request) {
                $chat = Chat::find($request->chat_id);
                $message = $request->message;
                $image = $request->image;
                $removeImgFlg = $request->remove_image;
                $user = Auth::user();
                define("REMOVE_IMAGE_TRUE", 1);

                if ((int)$removeImgFlg === REMOVE_IMAGE_TRUE || $image) {
                    // 画像削除フラグがtrueの時、または、画像が添付されている時

                    // 既存の画像があれば削除
                    if ($currentImage = $chat->image) {
                        Storage::disk("public")->delete($currentImage);
                    }
                    // 画像の保存
                    $filename = "";
                    if ($image) {
                        $filename = $this->saveImage($image);
                    }

                    $chat->update([
                        'message' => $message,
                        'image' =>$filename,
                    ]);

                    return [
                        'user' => $user,
                        'chat' => $chat->fresh(),
                    ];
                } else {
                    // 編集がメッセージのみの時

                    $chat->update([
                        'message' => $message,
                    ]);

                    return [
                        'user' => $user,
                        'chat' => $chat->fresh(),
                    ];
                }
            });

            return $res;
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * チャット削除
     *
     * @param string $id
     * @return Chat|null
     */
    public function destroyChatContent(string $id): Chat|null
    {
        try {
            $res = DB::transaction(function () use($id) {
                $chat = Chat::find($id);

                // 既存の画像があれば削除
                if ($currentImage = $chat->image) {
                    Storage::disk("public")->delete($currentImage);
                }
                $chat->delete();

                return $chat;
            });

            return $res;
        } catch (\Throwable $e) {
            return null;
        }
    }
}