<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Storybook Platform</title>
</head>
<body style="background-color: #1a202c; color: white; font-family: sans-serif; padding: 2rem;">

    <h1>Available Stories</h1>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
        <!-- Blade foreach loop to iterate over the $stories array -->
        @foreach ($stories as $story)
            <div style="background-color: #2d3748; padding: 15px; border-radius: 10px;">
                <img src="{{ $story->cover_image }}" alt="Cover" style="width: 100%; border-radius: 8px;">
                <h2>{{ $story->title }}</h2>
                <p><strong>Ages:</strong> {{ $story->target_age }}+</p>
                <p>{{ $story->description }}</p>
            </div>
        @endforeach
    </div>

</body>
</html>