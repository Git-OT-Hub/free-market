<?php

namespace App\Services\Contracts;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use App\Http\Requests\ChatRequest;
use App\Http\Requests\ChatEditRequest;
use App\Models\Item;
use App\Models\Chat;

interface TransactionServiceInterface
{
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
    public function getChatContent(ChatRequest $request): array|null;

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
    public function getContents(string $id): array|null;

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
    public function updateChatContent(ChatEditRequest $request): array|null;

    /**
     * チャットの削除
     *
     * @param string $id
     * @return Chat|null
     */
    public function deleteChatContent(string $id): Chat|null;

    /**
     * 取引評価処理
     *
     * @param Request $request
     * @return bool|null
     */
    public function completeTransaction(Request $request): bool|null;
}