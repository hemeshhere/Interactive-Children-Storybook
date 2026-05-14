import { useState, useDeferredValue, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBook, FaMagic, FaMoon, FaSadTear } from 'react-icons/fa';
import { BiPlay } from 'react-icons/bi';

export default function Library({ auth, stories }) {
    const [searchQuery, setSearchQuery] = useState('');
    const deferredSearchQuery = useDeferredValue(searchQuery);
    const [activeFilter, setActiveFilter] = useState('All');
    
    // Filters with associated react-icons
    const filters = [
        { name: 'All', icon: <FaBook /> },
        { name: 'Ages 3-5', icon: <span className="text-xl">👶</span> },
        { name: 'Ages 6-8', icon: <span className="text-xl">👦</span> },
        { name: 'Adventure', icon: <FaMagic /> },
        { name: 'Bedtime', icon: <FaMoon /> }
    ];

    // Filter logic handling both search text and category pills
    const filteredStories = useMemo(() => {
        // Safety check in case stories didn't load properly
        if (!stories) return []; 
        
        return stories.filter(story => {
            const matchesSearch = story.title.toLowerCase().includes(deferredSearchQuery.toLowerCase());
            let matchesFilter = true;
            if (activeFilter === 'Ages 3-5') matchesFilter = story.target_age <= 5;
            if (activeFilter === 'Ages 6-8') matchesFilter = story.target_age >= 6;
            return matchesSearch && matchesFilter;
        });
    }, [stories, deferredSearchQuery, activeFilter]);

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={<h2 className="text-4xl md:text-5xl font-black text-sky-600 drop-shadow-sm tracking-tight">Story Library</h2>}
        >
            <Head title="Library" />
            
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 mt-4 px-4 sm:px-0">
                
                {/* --- CREATIVE SEARCH & FILTERS --- */}
                <div className="flex flex-col xl:flex-row gap-6 justify-between items-center bg-white rounded-[40px] p-4 border-[6px] border-white shadow-[0_8px_0_rgba(0,0,0,0.05)]">
                    
                    {/* Pill Filters */}
                    <div className="flex gap-3 overflow-x-auto w-full xl:w-auto scrollbar-hide px-2 py-2">
                        {filters.map(filter => (
                            <button
                                key={filter.name} 
                                onClick={() => setActiveFilter(filter.name)}
                                className={`whitespace-nowrap px-6 py-3 rounded-full font-black text-lg transition-all flex items-center gap-2 border-[4px] ${
                                    activeFilter === filter.name 
                                    ? 'bg-yellow-400 border-yellow-400 text-yellow-900 shadow-[0_4px_0_#ca8a04] translate-y-[-2px]' 
                                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100 hover:border-slate-200'
                                }`}
                            >
                                {filter.icon}
                                {filter.name}
                            </button>
                        ))}
                    </div>

                    {/* Chunky Search Bar */}
                    <div className="relative w-full xl:w-96">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <FaSearch className="text-sky-400 w-6 h-6" />
                        </div>
                        <input
                            type="text" 
                            placeholder="Search for magic..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-sky-50 border-[4px] border-sky-200 text-slate-800 pl-14 pr-6 py-4 rounded-full font-black text-lg focus:outline-none focus:border-sky-400 focus:bg-white placeholder-slate-400 transition-colors shadow-inner"
                        />
                    </div>
                </div>

                {/* --- BOOK GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredStories.map((story) => (
                            <motion.div 
                                key={story.id} 
                                layout 
                                initial={{ opacity: 0, scale: 0.8 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0, scale: 0.8 }} 
                                transition={{ type: "spring", bounce: 0.4 }}
                                className="bg-white rounded-[40px] border-[6px] border-white shadow-[0_12px_0_rgba(0,0,0,0.08)] p-5 flex flex-col group hover:-translate-y-2 transition-transform"
                            >
                                {/* Cover Image Container */}
                                <div className="h-64 rounded-[24px] overflow-hidden border-[5px] border-slate-100 relative bg-sky-100 mb-5">
                                    <img src={story.cover_image} alt={story.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    
                                    {/* Age Badge */}
                                    <div className="absolute top-3 left-3 bg-pink-400 text-white text-sm font-black px-4 py-2 rounded-full border-[3px] border-pink-500 shadow-sm">
                                        Age {story.target_age}+
                                    </div>

                                    {/* Overlay Play Icon */}
                                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-sky-500 shadow-lg scale-50 group-hover:scale-100 transition-transform bounce">
                                            <BiPlay className="w-10 h-10 ml-1" />
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-slate-800 line-clamp-1 leading-tight">{story.title}</h3>
                                <p className="text-slate-500 font-bold text-base line-clamp-2 mt-2 mb-6 flex-1 leading-relaxed">{story.description}</p>
                                
                                <Link 
                                    href={route('reader', story.id)} 
                                    className="flex items-center justify-center gap-2 w-full bg-emerald-400 text-emerald-950 font-black text-xl py-4 rounded-full shadow-[0_6px_0_#059669] group-hover:bg-emerald-300 transition-colors"
                                >
                                    <FaBook className="w-5 h-5" />
                                    Read Now
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* --- EMPTY STATE --- */}
                {filteredStories.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-[40px] border-[6px] border-white shadow-sm mt-8"
                    >
                        <FaSadTear className="w-24 h-24 mx-auto text-sky-300 mb-6" />
                        <h3 className="text-4xl font-black text-slate-700 mb-3 tracking-tight">Oh no! No magic found.</h3>
                        <p className="text-slate-500 font-bold text-xl">Try adjusting your filters or typing something else!</p>
                    </motion.div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}