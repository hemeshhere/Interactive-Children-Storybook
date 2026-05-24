<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'age', 'avatar', 'color', 'shadow', 'points', 'books_read', 'reading_time_minutes'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // A profile can read many stories
    public function stories()
    {
        return $this->belongsToMany(Story::class)->withTimestamps();
    }
}