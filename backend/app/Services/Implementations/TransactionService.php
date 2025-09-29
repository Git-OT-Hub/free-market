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
     *   user_name: string,
     *   user_image: string|null,
     *   chat_id: int,
     *   chat_message: string,
     *   chat_image: string|null,
     * }|null
     */
    public function getChatContent(ChatRequest $request): array|null
    {
        $res = $this->transactionRepository->saveChatContent($request);

        return $res;
    }
}