<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class ItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation()
    {
        if ($this->has('category_id') && is_string($this->category_id)) {
            $this->merge([
                'category_id' => json_decode($this->category_id, true),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'state' => ['required', 'integer', 'between:1,4'],
            'image' => ['required', 'image', 'mimes:jpeg,png'],
            'category_id' => ['required', 'array', 'min:1'],
            'category_id.*' => ['integer', 'exists:categories,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => '商品名を入力してください',
            'name.string' => '商品名を文字列で入力してください',
            'name.max' => '商品名を255文字以下で入力してください',

            'brand.string' => 'ブランド名を文字列で入力してください',
            'brand.max' => 'ブランド名を255文字以下で入力してください',

            'description.required' => '商品の説明を入力してください',
            'description.string' => '商品の説明を文字列で入力してください',
            'description.max' => '商品の説明を255文字以下で入力してください',

            'price.required' => '販売価格を入力してください',
            'price.integer' => '販売価格を整数で入力してください',
            'price.min' => '販売価格を0円以上で入力してください',

            'state.required' => '商品の状態を選択してください',
            'state.integer' => '商品の状態の形式が正しくありません',
            'state.between' => '商品の状態を選択肢の中から選んでください',

            'image.required' => '画像ファイルの添付は必須です',
            'image.image' => '画像ファイルを添付してください',
            'image.mimes' => '画像ファイルは、jpeg もしくは png 形式のものを添付してください',

            'category_id.required' => 'カテゴリーを選択してください',
            'category_id.array' => 'カテゴリーの形式が正しくありません',
            'category_id.min' => 'カテゴリーを1つ以上選択してください',
            'category_id.*.integer' => 'カテゴリーIDの形式が正しくありません',
            'category_id.*.exists' => '選択されたカテゴリーは存在しません',
        ];
    }

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
