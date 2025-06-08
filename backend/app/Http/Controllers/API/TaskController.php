<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = [
            ['id' => 1, 'title' => 'タスク1', 'completed' => false],
            ['id' => 2, 'title' => 'タスク2', 'completed' => true],
            ['id' => 3, 'title' => 'タスク3', 'completed' => false],
        ];

        return response()->json($tasks);
    }
}
