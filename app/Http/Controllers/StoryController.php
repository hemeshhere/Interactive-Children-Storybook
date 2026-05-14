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
    // Add this method inside your StoryController class
    public function library()
    {
        // Fetch all stories (in a real app, you might add pagination here)
        $stories = \App\Models\Story::all();

        return Inertia::render('Library', [
            'stories' => $stories
        ]);
    }
    // Add this method inside your StoryController
    public function read($id)
    {
        // Fetch the story and its pages from the DB, ordered by page number
        $story = \App\Models\Story::with(['pages' => function($query) {
            $query->orderBy('page_number', 'asc');
        }])->findOrFail($id);

        return \Inertia\Inertia::render('Story/Reader', [
            'story' => $story
        ]);
    }
}