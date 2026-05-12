<?php

namespace Database\Factories;

use App\Models\Story;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Story>
 */
class StoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3), // Generates a 3-word title
            'description' => fake()->paragraph(), // Generates a short paragraph
            'target_age' => fake()->numberBetween(3, 10), // Random age between 3 and 10
            'cover_image' => 'https://picsum.photos/400/300', // Placeholder image
        ];
    }
}
