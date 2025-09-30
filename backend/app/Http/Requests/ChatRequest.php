<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class ChatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'purchase_id' => ['required', 'integer'],
            'message' => ['required', 'string', 'max:400'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png'],
        ];
    }

    /**
     * バリデーションエラーの日本語化
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'purchase_id.required' => '購入履歴IDは必須です',
            'purchase_id.integer' => '購入履歴IDは整数で送信してください',

            'message.required' => '本文を入力してください',
            'message.string' => '本文を文字列で入力してください',
            'message.max' => '本文は400文字以内で入力してください',

            'image.image' => '画像ファイルを添付してください',
            'image.mimes' => '「.png」または「.jpeg」形式でアップロードしてください',
        ];
    }

    /**
     * APIのバリデーションチェックに失敗した際、JSONでエラーレスポンスを返す
     *
     * @param Validator $validator
     * @return void
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $response = [
            'errors' => $validator->errors()->toArray(),
        ];

        throw new HttpResponseException(
            response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY)
        );
    }
}
