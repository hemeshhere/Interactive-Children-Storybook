<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    // Add this line to allow saving these fields
    protected $fillable = ['user_id', 'name', 'avatar_url', 'age', 'points', 'preferences'];

    // Ensure preferences is cast to an array when retrieved from the JSON column
    protected function casts(): array
    {
        return [
            'preferences' => 'array',
        ];
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function progress()
    {
        return $this->hasMany(Progress::class);
    }
}