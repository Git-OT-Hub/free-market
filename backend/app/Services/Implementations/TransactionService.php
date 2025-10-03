<?php

namespace App\Services\Implementations;

use App\Services\Contracts\TransactionServiceInterface;
use App\Repositories\Contracts\TransactionRepositoryInterface;
use App\Http\Requests\ChatRequest;

class TransactionService implements TransactionServiceInterface
{
    private TransactionRepositoryInterface $transactionRepository;

    public function __construct(TransactionRepositoryInterface $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    /**
     * 送信されたチャット内容を元に、チャット画面に表示させる情報を生成
     *
     * @param ChatRequest $request
     * @return array{
     *   user_id: int,
     *   user_name: string,
     *   user_image: string|null,
     *   chat_id: int,
     *   chat_message: string,
     *   chat_image: string|null,
     * }|null
     */
    public function getChatContent(ChatRequest $request): array|null
    {
        try {
            $res = $this->transactionRepository->saveChatContent($request);

            if (!$res) {
                return null;
            }

            $user = $res['user'];
            $chat = $res['chat'];
            $userImage = $user->profile->image;

            return [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'user_image' => $userImage,
                'chat_id' => $chat->id,
                'chat_message' => $chat->message,
                'chat_image' => $chat->image,
            ];
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * 取引画面に表示させる情報を生成
     *
     * @param string $id
     * @return array{
     *   other_transactions: Collection<int, Item>|null,
     *   partner_name: string,
     *   partner_image: string|null,
     *   item_name: string,
     *   item_price: int,
     *   item_image: string,
     *   item_seller_id: int,
     *   chats: array<int, array{
     *     user_id: int,
     *     user_name: string,
     *     user_image: string|null,
     *     chat_id: int,
     *     chat_message: string,
     *     chat_image: string|null,
     *   }>|null
     * }|null
     */
    public function getContents(string $id): array|null
    {
        try {
            $res = $this->transactionRepository->findContents($id);
            if (!$res) {
                return null;
            }

            $item = $res['item'];
            $partner = $res['partner'];
            $otherTransactionList = $res['other_transaction_list'];
            $chats = $res['chats'];

            // レスポンス用にチャットデータ加工
            $resChats = [];
            foreach ($chats as $chat) {
                $resChats[] = [
                    'user_id' => $chat->user->id ?? null,
                    'user_name' => $chat->user->name ?? null,
                    'user_image' => $chat->user->profile->image ?? null,
                    'chat_id' => $chat->id ?? null,
                    'chat_message' => $chat->message ?? null,
                    'chat_image' => $chat->image ?? null,
                ];
            }

            return [
                'other_transactions' => $otherTransactionList ?? null,
                'partner_name' => $partner->name ?? null,
                'partner_image' => $partner->profile->image ?? null,
                'item_name' => $item->name ?? null,
                'item_price' => $item->price ?? null,
                'item_image' => $item->image ?? null,
                'item_seller_id' => $item->user_id ?? null,
                'chats' => $resChats ?? null,
            ];
        } catch (\Throwable $e) {
            return null;
        }
    }
}