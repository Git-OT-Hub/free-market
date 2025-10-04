<?php

namespace App\Services\Implementations;

use Illuminate\Http\Request;
use App\Services\Contracts\TransactionServiceInterface;
use App\Repositories\Contracts\TransactionRepositoryInterface;
use App\Http\Requests\ChatRequest;
use App\Http\Requests\ChatEditRequest;
use App\Models\Chat;

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
                'user_id' => $user->id ?? null,
                'user_name' => $user->name ?? null,
                'user_image' => $userImage ?? null,
                'chat_id' => $chat->id ?? null,
                'chat_message' => $chat->message ?? null,
                'chat_image' => $chat->image ?? null,
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
     *   transaction_complete_flg: int,
     *   is_evaluated: int,
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
            $transactionCompleteFlg = $item->purchase->is_transaction_completed;
            $partner = $res['partner'];
            $otherTransactionList = $res['other_transaction_list'];
            $chats = $res['chats'];

            // 取引相手を評価済みかどうか
            $isEvaluated = $partner->transactionEvaluations()
                ->where('purchase_id', $item->purchase->id)
                ->where('user_id', $partner->id)
                ->exists() ? 1 : 0;

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
                'transaction_complete_flg' => $transactionCompleteFlg ?? null,
                'is_evaluated' => $isEvaluated ?? null,
                'chats' => $resChats ?? null,
            ];
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * チャット内容の修正を行い、チャット画面に表示させる情報を返す
     *
     * @param ChatEditRequest $request
     * @return array{
     *   user_id: int,
     *   user_name: string,
     *   user_image: string|null,
     *   chat_id: int,
     *   chat_message: string,
     *   chat_image: string|null,
     * }|null
     */
    public function updateChatContent(ChatEditRequest $request): array|null
    {
        try {
            $res = $this->transactionRepository->fixChatContent($request);

            if (!$res) {
                return null;
            }

            $user = $res['user'];
            $chat = $res['chat'];
            $userImage = $user->profile->image;

            return [
                'user_id' => $user->id ?? null,
                'user_name' => $user->name ?? null,
                'user_image' => $userImage ?? null,
                'chat_id' => $chat->id ?? null,
                'chat_message' => $chat->message ?? null,
                'chat_image' => $chat->image ?? null,
            ];
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * チャットの削除
     *
     * @param string $id
     * @return Chat|null
     */
    public function deleteChatContent(string $id): Chat|null
    {
        try {
            $res = $this->transactionRepository->destroyChatContent($id);

            if (!$res) {
                return null;
            }

            return $res;
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * 取引評価処理
     *
     * @param Request $request
     * @return bool|null
     */
    public function completeTransaction(Request $request): bool|null
    {
        try {
            $res = $this->transactionRepository->createEvaluation($request);

            if (!$res) {
                return null;
            }

            $loginUser = $res['login_user'];
            $seller = $res['seller'];
            // メール送信

            return true;
        } catch (\Throwable $e) {
            return null;
        }
    }
}