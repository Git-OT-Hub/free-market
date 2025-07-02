<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\ItemState;
use Illuminate\Support\Facades\Auth;

class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'brand',
        'description',
        'price',
        'state',
        'image',
        'sold_at',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_items', 'item_id', 'category_id')->withTimestamps();
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'likes', 'item_id', 'user_id')->withTimestamps();
    }

    public function commentedUsers()
    {
        return $this->belongsToMany(User::class, 'comments', 'item_id', 'user_id')->withPivot('id', 'user_id', 'comment')->withTimestamps()->orderByPivot('created_at', 'desc');
    }

    public function getCategories()
    {
        return $this->categories->pluck('content')->all();
    }

    public function convertStateToString()
    {
        $state = "";
        $itemStates = ItemState::cases();
        foreach ($itemStates as $itemState) {
            if ($itemState->value === $this->state) {
                $state = $itemState->label();
            }
        }

        return $state;
    }

    public function isLike()
    {
        return $this->users()->where('user_id', Auth::id())->exists();
    }

    public function likesCount()
    {
        return $this->users()->count();
    }

    public function getComments()
    {
        $response = [];
        foreach ($this->commentedUsers as $user) {
            $response[] = [
                "user_name" => $user->name,
                "user_img" => $user->profile->image,
                "comment" => $user->pivot->comment,
                "comment_id" => $user->pivot->id,
            ];
        }

        return $response;
    }

    public function commentsCount()
    {
        return $this->commentedUsers()->count();
    }
}
