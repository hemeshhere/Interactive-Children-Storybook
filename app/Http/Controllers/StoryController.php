<?php

namespace App\Http\Controllers;

use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia; // Import Inertia

class StoryController extends Controller
{
    public function index()
    {
        // Fetch stories with their pages so the frontend has everything
        $stories = Story::with('pages')->get(); 

        // Send data to a React component named "Welcome"
        return Inertia::render('Welcome', [
            'stories' => $stories
        ]);
    }
}