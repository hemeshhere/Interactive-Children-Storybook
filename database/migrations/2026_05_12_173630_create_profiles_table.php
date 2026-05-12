<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            // Links this profile to the Parent (User)
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); 
            
            $table->string('name');
            $table->string('avatar_url')->nullable();
            $table->integer('age');
            $table->integer('points')->default(0); // For gamification later!
            
            // JSON column for individual child settings
            $table->json('preferences')->nullable(); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
