<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'post_code' => fake()->postcode1() . '-' . fake()->postcode2(),
            'address' => fake()->prefecture() . fake()->city() . fake()->ward() . fake()->streetAddress(),
            'building' => fake()->secondaryAddress(),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
