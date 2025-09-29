<?php

namespace App\Repositories\Contracts;

use App\Http\Requests\ChatRequest;
use App\Models\User;
use App\Models\Chat;

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
}