<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class ChatEditRequest extends FormRequest
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
            'chat_id' => ['required', 'integer'],
            'message' => ['required', 'string', 'max:400'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png'],
            'remove_image' => ['required', 'integer'],
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
            'chat_id.required' => 'チャットIDは必須です',
            'chat_id.integer' => 'チャットIDは整数で送信してください',

            'message.required' => '本文を入力してください',
            'message.string' => '本文を文字列で入力してください',
            'message.max' => '本文は400文字以内で入力してください',

            'image.image' => '画像ファイルを添付してください',
            'image.mimes' => '「.png」または「.jpeg」形式でアップロードしてください',

            'remove_image.required' => '画像削除フラグは必須です',
            'remove_image.integer' => '画像削除フラグは整数で送信してください',
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
