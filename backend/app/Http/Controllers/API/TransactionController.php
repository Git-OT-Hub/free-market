<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\ChatRequest;
use App\Services\Contracts\TransactionServiceInterface;
use App\Models\Purchase;

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

    /**
     * チャットリスト、取引相手情報、取引商品情報を取得し、その結果を JSON形式で返す
     *
     * @param  string $id
     * @return JsonResponse
    */
    public function contents(string $id): JsonResponse
    {
        // ポリシーの呼び出し
        $purchase = Purchase::with(['item', 'user'])->find($id);
        $this->authorize('view', $purchase);

        $res = $this->transactionService->getContents($id);

        if (!$res) {
            return response()->json([
                'message' => '取引内容の取得に失敗しました'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json($res, Response::HTTP_OK);
    }
}
