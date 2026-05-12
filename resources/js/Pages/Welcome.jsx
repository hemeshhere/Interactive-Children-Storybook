import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome({ auth, stories }) {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
            <Head title="Interactive Storybook" />

            {/* Navigation Bar */}
            <nav className="p-6 flex justify-between items-center bg-slate-800/50 backdrop-blur-md border-b border-slate-700">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    MagicBooks.io
                </h1>
                
                <div>
                    {auth.user ? (
                        <Link href={route('dashboard')} className="text-slate-300 hover:text-white px-4">
                            Parent Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-slate-300 hover:text-white px-4">Log in</Link>
                            <Link href={route('register')} className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold transition-all">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto p-8 mt-8">
                <h2 className="text-4xl font-extrabold mb-8 text-center">Available Stories</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <motion.div 
                            key={story.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer group"
                        >
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={story.cover_image} 
                                    alt={story.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                                <div className="flex items-center gap-2 mb-4 text-sm text-slate-400">
                                    <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">
                                        Ages {story.target_age}+
                                    </span>
                                </div>
                                <p className="text-slate-300 line-clamp-3">{story.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}