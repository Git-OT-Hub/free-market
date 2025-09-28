<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\ChatRequest;

class TransactionController extends Controller
{
    /**
     * チャット内容の登録処理を行い、その結果を JSON形式で返す
     *
     * @param ChatRequest $request
     * @return JsonResponse
    */
    public function createChat(ChatRequest $request): JsonResponse
    {
        

        return response()->json('ok!!', Response::HTTP_CREATED);
    }
}
