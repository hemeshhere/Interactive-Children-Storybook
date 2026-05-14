<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Story;
use App\Models\Page;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create a Test Parent Account
        User::factory()->create([
            'name' => 'Parent User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        // 2. Define our rich library of 12 stories
        $storyLibrary = [
            [
                'title' => 'The Brave Little Fox',
                'description' => 'Join Finn the fox on a magical night adventure through the glowing forest.',
                'target_age' => 4,
                'cover_image' => 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'Once upon a time, in a deep magical forest, lived a little fox named Finn. He loved to chase the glowing fireflies.', 'image' => 'https://lottie.host/8b51d148-73b3-4660-8dbb-f63ba317f225/Vw3U8F9D8q.json'],
                    ['text' => 'One night, the moon was so bright it turned the leaves silver. Finn heard a strange rustling in the bushes...', 'image' => 'https://lottie.host/17b2ed03-4f51-4e76-8802-dbcf00923293/h5B8eW2R8M.json'],
                    ['text' => 'It was just a tiny, friendly hedgehog! Finn smiled, and they played under the stars until morning.', 'image' => 'https://images.unsplash.com/photo-1542451313056-b7c8e626645f?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'Cosmic Explorer Alex',
                'description' => 'Blast off into space and discover new planets with Astronaut Alex!',
                'target_age' => 6,
                'cover_image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'Alex put on her shiny space helmet. "Initiate launch sequence!" she shouted. 3, 2, 1... BLAST OFF!', 'image' => 'https://lottie.host/a6edc22c-a5d6-4441-863a-4fb4864bcfd1/W8xH6w1gq2.json'],
                    ['text' => 'Her ship zoomed past the moon and danced around the rings of Saturn. Space was beautiful.', 'image' => 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'The Sleepy Bear',
                'description' => 'It is time for hibernation, but Barnaby the bear just wants to play.',
                'target_age' => 3,
                'cover_image' => 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'The leaves were falling, turning red and gold. Mama Bear yawned. "Time for sleep, Barnaby," she whispered.', 'image' => 'https://images.unsplash.com/photo-1550353127-b0ce3aeebfc4?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'But Barnaby was not tired! He rolled in the leaves and chased a sleepy butterfly.', 'image' => 'https://images.unsplash.com/photo-1476901844510-8b1b3fb4900a?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'Finally, a big yawn escaped his mouth. He curled up next to Mama, ready for winter dreams.', 'image' => 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'Mystery of the Coral Reef',
                'description' => 'Dive deep under the sea to help a little turtle find his lost shell pattern.',
                'target_age' => 7,
                'cover_image' => 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'Timmy the turtle woke up feeling strange. His shell was completely blank! Where did his green squares go?', 'image' => 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'He asked the wise octopus, who pointed a purple tentacle towards the deep, dark trench.', 'image' => 'https://images.unsplash.com/photo-1545672496-52c673199fbf?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'Dinosaur School',
                'description' => 'It is Rex\'s first day of school, but his roar is just a tiny squeak!',
                'target_age' => 5,
                'cover_image' => 'https://images.unsplash.com/photo-1518144591331-17a5dd71c477?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'Rex grabbed his lunchbox. Today was the day! He was going to learn how to be a big, scary T-Rex.', 'image' => 'https://images.unsplash.com/photo-1559828456-621815cc20d1?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'During roar practice, the other dinos went "ROAR!" but Rex just went "peep." Everyone giggled.', 'image' => 'https://images.unsplash.com/photo-1569584620025-a18d1fbb4be9?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'The Magic Paintbrush',
                'description' => 'Everything Mia paints comes to life. What will she create today?',
                'target_age' => 6,
                'cover_image' => 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'Mia found an old brush in the attic. She painted a blue bird on the wall...', 'image' => 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'Suddenly, the bird chirped and flew right off the canvas, circling her room!', 'image' => 'https://images.unsplash.com/photo-1444464666168-49b626f8627c?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'Pip\'s First Winter',
                'description' => 'A tiny penguin learns how to slide on the ice for the very first time.',
                'target_age' => 4,
                'cover_image' => 'https://images.unsplash.com/photo-1551415923-31d2072bc248?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'The ice was slippery. Pip wobbled, flapped his little wings, and PLOP! He fell on his tummy.', 'image' => 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'But wait... sliding on his tummy was fun! He zoomed past his friends like a rocket.', 'image' => 'https://images.unsplash.com/photo-1517594422361-5e18d4073356?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'The Secret Treehouse',
                'description' => 'Leo and Sam discover a treehouse that can transport them anywhere in the world.',
                'target_age' => 8,
                'cover_image' => 'https://images.unsplash.com/photo-1520607161513-3c99fcbdf702?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'High in the oak tree, they found a glowing wooden door. Sam slowly turned the brass knob.', 'image' => 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'They stepped through and found themselves standing on a giant, floating cloud!', 'image' => 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'Goodnight, Little Monster',
                'description' => 'Even monsters need to brush their fangs before bed!',
                'target_age' => 3,
                'cover_image' => 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'Grumble the monster put on his polka-dot pajamas. "No sleep!" he grumbled.', 'image' => 'https://images.unsplash.com/photo-1606558458145-20078b5e5898?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'His dad read him a story about a brave knight, and Grumble\'s eyes grew heavy.', 'image' => 'https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'The Great Robot Race',
                'description' => 'Build, tune, and race! Whose robot will cross the finish line first?',
                'target_age' => 7,
                'cover_image' => 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'Sparks flew as Maya tightened the final bolt on her speed-bot, "Lightning".', 'image' => 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'The green flag dropped. Lightning zoomed ahead, dodging obstacles with perfect turns!', 'image' => 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'Lily and the Dragon',
                'description' => 'A story about an unlikely friendship between a village girl and a fire-breathing dragon.',
                'target_age' => 6,
                'cover_image' => 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'Everyone said the dragon was mean. But Lily saw him crying behind the mountain.', 'image' => 'https://images.unsplash.com/photo-1502472581566-8ac52e3e1e82?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'She offered him a toasted marshmallow. The dragon sniffed it, ate it, and smiled a toothy grin.', 'image' => 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
            [
                'title' => 'The Lost Kite',
                'description' => 'Follow the red kite as it flies through the city, over the park, and into the clouds.',
                'target_age' => 5,
                'cover_image' => 'https://images.unsplash.com/photo-1528321917418-af00f8823def?q=80&w=800&auto=format&fit=crop',
                'pages' => [
                    ['text' => 'A strong gust of wind pulled the string right out of Leo\'s hand. "Oh no!" he cried.', 'image' => 'https://images.unsplash.com/photo-1504151932400-72d4384f0e1d?q=80&w=800&auto=format&fit=crop'],
                    ['text' => 'The red kite soared over the baker, past the barking dog, and high up into the blue sky.', 'image' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop'],
                ]
            ],
        ];

        // 3. Loop through the array and insert into the database
        foreach ($storyLibrary as $storyData) {
            // Create the Story
            $story = Story::create([
                'title' => $storyData['title'],
                'description' => $storyData['description'],
                'target_age' => $storyData['target_age'],
                'cover_image' => $storyData['cover_image'],
            ]);

            // Create the Pages for this Story
            foreach ($storyData['pages'] as $index => $pageData) {
                Page::create([
                    'story_id' => $story->id,
                    'page_number' => $index + 1, // 1-based indexing for pages
                    'content' => $pageData['text'],
                    'image_url' => $pageData['image'],
                ]);
            }
        }
    }
}