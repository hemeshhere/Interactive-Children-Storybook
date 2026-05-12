<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // 1. Import the trait
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory; // 2. Use the trait inside the class

    // If you plan to insert data manually later, it's good practice to add fillable fields
    protected $fillable = [
        'title',
        'description',
        'target_age',
        'cover_image',
    ];
    public function pages()
    {
        return $this->hasMany(Page::class)->orderBy('page_number', 'asc');
    }
}