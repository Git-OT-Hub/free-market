<?php

namespace App\Repositories\Implementations;

use App\Repositories\Contracts\TransactionRepositoryInterface;
use App\Http\Requests\ChatRequest;

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
        return null;
    }
}