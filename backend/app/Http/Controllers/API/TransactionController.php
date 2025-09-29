<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\ChatRequest;
use App\Services\Contracts\TransactionServiceInterface;

class TransactionController extends Controller
{
    private TransactionServiceInterface $transactionService;

    public function __construct(TransactionServiceInterface $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    /**
     * チャット内容の登録処理を行い、その結果を JSON形式で返す
     *
     * @param ChatRequest $request
     * @return JsonResponse
    */
    public function createChat(ChatRequest $request): JsonResponse
    {
        $res = $this->transactionService->getChatContent($request);

        if (!$res) {
            return response()->json([
                'message' => 'チャット内容の登録に失敗しました'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json($res, Response::HTTP_CREATED);
    }
}
