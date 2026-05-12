<?php

namespace App\Http\Controllers;

use App\Models\Story; // Import the Story model
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function index()
    {
        // Fetch all stories from the database
        $stories = Story::all(); 

        // Pass the stories to a view (which we will create next)
        return view('stories.index', ['stories' => $stories]);
    }
}