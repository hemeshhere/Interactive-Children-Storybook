<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    // Make sure these match what the seeder is trying to insert
    protected $fillable = [
        'story_id', 
        'page_number', 
        'content', 
        'image_url'
    ];

    public function story()
    {
        return $this->belongsTo(Story::class);
    }
}