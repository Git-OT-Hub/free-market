<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Category;
use App\Enums\ItemState;

class CategoryController extends Controller
{
    public function getCategories()
    {
        $categories = Category::all()->map(function ($category) {
            return [
                "id" => $category->id,
                "content" => $category->content,
                "checked" => false,
            ];
        });
        $itemStates = $this->getItemStates();
        $response = [
            "categories" => $categories,
            "itemStates" => $itemStates,
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    public function getItemStates()
    {
        $itemStates = ItemState::cases();
        $response = array_map(function ($itemState) {
            return [
                "value" => $itemState->value,
                "label" => $itemState->label(),
            ];
        }, $itemStates);

        return $response;
    }
}
