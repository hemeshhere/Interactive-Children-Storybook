<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoryController;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. The Public Homepage
Route::get('/', [StoryController::class, 'index']);

// 2. Protected Parent/Child Routes (Requires Login)
Route::middleware(['auth', 'verified'])->group(function () {
    
    // --- FAMILY DASHBOARD ROUTE (With Advanced Analytics) ---
    Route::get('/dashboard', function () {
        $user = auth()->user();
        
        // Fetch profiles AND the stories they have read
        $profiles = $user->profiles()->with('stories')->get(); 

        $totalBooksRead = $profiles->sum('books_read');
        $totalReadingMinutes = $profiles->sum('reading_time_minutes');
        
        $totalHours = floor($totalReadingMinutes / 60);
        $remainingMinutes = $totalReadingMinutes % 60;

        $totalPoints = $profiles->sum('points');
        $avgMinsPerBook = $totalBooksRead > 0 ? round($totalReadingMinutes / $totalBooksRead) : 0;

        return Inertia::render('Dashboard', [
            'profiles' => $profiles,
            'familyStats' => [
                'books_read' => $totalBooksRead,
                'reading_time_hours' => $totalHours,
                'reading_time_minutes' => $remainingMinutes,
                'total_points' => $totalPoints,
                'avg_pace' => $avgMinsPerBook,
            ]
        ]);
    })->name('dashboard');

    // The Story Library
    Route::get('/library', [StoryController::class, 'library'])->name('library');

    // The Interactive Reader
    Route::get('/reader/{id}', [StoryController::class, 'read'])->name('reader');

    // --- MARK BOOK AS FINISHED ROUTE ---
    Route::post('/reader/{story}/finish', function (\App\Models\Story $story) {
        $profileId = session('active_profile_id');
        
        if (!$profileId) {
            return redirect()->route('library'); 
        }

        $profile = \App\Models\Profile::findOrFail($profileId);
        $profile->stories()->syncWithoutDetaching([$story->id]);
        $profile->increment('books_read');
        $profile->increment('points', 50);

        return redirect()->route('dashboard');
    })->name('reader.finish');

    // --- CREATE CHILD PROFILE ROUTE ---
    Route::post('/profiles', function (Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:1|max:18',
            'avatar' => 'required|string',
        ]);

        $styles = [
            'FaUserAstronaut' => ['color' => 'bg-yellow-300 border-yellow-400 text-yellow-900', 'shadow' => 'shadow-[0_8px_0_#facc15]'],
            'FaUserNinja' => ['color' => 'bg-pink-300 border-pink-400 text-pink-900', 'shadow' => 'shadow-[0_8px_0_#f472b6]'],
            'FaRobot' => ['color' => 'bg-sky-300 border-sky-400 text-sky-900', 'shadow' => 'shadow-[0_8px_0_#7dd3fc]'],
            'FaCat' => ['color' => 'bg-emerald-300 border-emerald-400 text-emerald-900', 'shadow' => 'shadow-[0_8px_0_#6ee7b7]'],
        ];
        
        $theme = $styles[$request->avatar] ?? $styles['FaUserAstronaut'];

        $request->user()->profiles()->create([
            'name' => $request->name,
            'age' => $request->age,
            'avatar' => $request->avatar,
            'color' => $theme['color'],
            'shadow' => $theme['shadow'],
            'points' => 0,
            'books_read' => 0,
            'reading_time_minutes' => 0,
        ]);

        return back();
    })->name('profiles.store');

    // --- ACTIVATE CHILD PROFILE ROUTE ---
    Route::post('/profiles/{profile}/activate', function (\App\Models\Profile $profile) {
        if ($profile->user_id !== auth()->id()) {
            abort(403);
        }

        session(['active_profile_id' => $profile->id]);
        session(['active_profile_name' => $profile->name]);

        return redirect()->route('library');
    })->name('profiles.activate');

    // Standard Breeze Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';