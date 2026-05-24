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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Links to Parent
            $table->string('name');
            $table->integer('age');
            $table->string('avatar')->default('FaUserAstronaut');
            $table->string('color')->default('bg-yellow-300 border-yellow-400 text-yellow-900');
            $table->string('shadow')->default('shadow-[0_8px_0_#facc15]');
            $table->integer('points')->default(0);
            $table->integer('books_read')->default(0);
            $table->integer('reading_time_minutes')->default(0);
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
