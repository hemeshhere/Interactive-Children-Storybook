import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/app.jsx'
            ],
            refresh: true,
        }),
        react(),
    ],
    build: {
        // Force Vite to use these files, NEVER index.html
        rollupOptions: {
            input: [
                'resources/css/app.css', 
                'resources/js/app.jsx'
            ],
        }
    }
});