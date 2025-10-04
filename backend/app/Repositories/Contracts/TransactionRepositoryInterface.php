<?php

namespace App\Repositories\Contracts;

use App\Http\Requests\ChatRequest;
use App\Http\Requests\ChatEditRequest;
use App\Models\User;
use App\Models\Chat;
use App\Models\Item;

interface TransactionRepositoryInterface
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
    public function saveChatContent(ChatRequest $request): array|null;

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
    public function findContents(string $id): array|null;

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
    public function fixChatContent(ChatEditRequest $request): array|null;
}