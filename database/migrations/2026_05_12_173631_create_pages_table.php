<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            // Link to the Story
            $table->foreignId('story_id')->constrained()->cascadeOnDelete();
            
            $table->integer('page_number'); // e.g., Page 1, Page 2
            
            // The visual and audio assets
            $table->string('image_url')->nullable(); // Path to the Lottie file or image
            $table->string('audio_path')->nullable(); // Path to the narrator's voice file
            
            // The actual story text for this specific page
            $table->text('content'); 
            
            // THIS IS THE SECRET SAUCE: The JSON array mapping words to audio timestamps
            $table->json('audio_timestamps')->nullable(); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
