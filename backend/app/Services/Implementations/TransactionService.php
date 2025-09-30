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
}