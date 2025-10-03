<?php

namespace App\Policies;

use App\Models\Purchase;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PurchasePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * 取引内容を閲覧できるか判定
     *
     * - purchase.user_id がログインユーザーの場合（購入者）
     * - purchase.item.user_id がログインユーザーの場合（出品者）
     */
    public function view(User $user, Purchase $purchase): bool
    {
        return $purchase->user_id === $user->id
            || $purchase->item->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Purchase $purchase): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Purchase $purchase): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Purchase $purchase): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Purchase $purchase): bool
    {
        //
    }
}
