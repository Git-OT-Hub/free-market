<?php

namespace App\Repositories\Implementations;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use App\Repositories\Contracts\TransactionRepositoryInterface;
use App\Http\Requests\ChatRequest;
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
}