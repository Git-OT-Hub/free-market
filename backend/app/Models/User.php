<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function profile()
    {
        return $this->hasOne(Profile::class, 'user_id');
    }

    public function exhibitList()
    {
        return $this->hasMany(Item::class);
    }

    public function purchaseList()
    {
        return $this->hasManyThrough(Item::class, Purchase::class, 'user_id', 'id', 'id', 'item_id');
    }

    public function likes()
    {
        return $this->belongsToMany(Item::class, 'likes', 'user_id', 'item_id')->withTimestamps();
    }

    public function comments()
    {
        return $this->belongsToMany(Item::class, 'comments', 'user_id', 'item_id')->withPivot('id', 'item_id', 'comment')->withTimestamps()->orderByPivot('created_at', 'desc');
    }

    public function getShippingAddress()
    {
        $profile = $this->profile;

        return [
            "post_code" => $profile->post_code,
            "address" => $profile->address,
            "building" => $profile->building,
        ];
    }

    public function transactionList()
    {
        $itemsAsSeller = Item::with('purchase')
            ->where('user_id', Auth::id())
            ->whereHas('purchase', function ($query) {
                $query->where('is_transaction_completed', false);
            })
            ->get();

        $itemsAsBuyer = Item::with('purchase')
            ->whereHas('purchase', function ($query) {
                $query->where('user_id', Auth::id())
                    ->where('is_transaction_completed', false);
            })
            ->get();

        return $itemsAsSeller
            ->merge($itemsAsBuyer)
            ->unique('id')
            ->values();
    }
}
