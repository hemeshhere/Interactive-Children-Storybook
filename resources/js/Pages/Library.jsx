import { useState, useDeferredValue, useMemo, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaSearch, FaBook, FaMagic, FaMoon, FaSadTear, 
    FaBaby, FaChild, FaBookOpen 
} from 'react-icons/fa';
import { BiPlay } from 'react-icons/bi';

// --- CUSTOM ANIMATED SPARKLES ---
const FloatingSparkles = () => {
    const [sparkles, setSparkles] = useState([]);
    useEffect(() => {
        setSparkles([...Array(12)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() > 0.5 ? 'text-yellow-300' : 'text-pink-300',
            delay: Math.random() * 5,
            duration: 2 + Math.random() * 3
        })));
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {sparkles.map((sparkle) => (
                <motion.div
                    key={sparkle.id}
                    initial={{ y: 0, opacity: 0, scale: 0 }}
                    animate={{ y: -50, opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 180 }}
                    transition={{ repeat: Infinity, duration: sparkle.duration, delay: sparkle.delay, ease: "easeInOut" }}
                    className={`absolute ${sparkle.size} opacity-50`}
                    style={{ left: sparkle.left, top: sparkle.top }}
                >
                    ✦
                </motion.div>
            ))}
        </div>
    );
};

export default function Library({ auth, stories }) {
    const [searchQuery, setSearchQuery] = useState('');
    const deferredSearchQuery = useDeferredValue(searchQuery);
    const [activeFilter, setActiveFilter] = useState('All');
    
    // Upgraded Filters with React Icons
    const filters = [
        { name: 'All', icon: <FaBook /> },
        { name: 'Ages 3-5', icon: <FaBaby className="text-xl" /> },
        { name: 'Ages 6-8', icon: <FaChild className="text-xl" /> },
        { name: 'Adventure', icon: <FaMagic /> },
        { name: 'Bedtime', icon: <FaMoon /> }
    ];

    // Filter logic
    const filteredStories = useMemo(() => {
        if (!stories) return []; 
        
        return stories.filter(story => {
            const matchesSearch = story.title.toLowerCase().includes(deferredSearchQuery.toLowerCase());
            let matchesFilter = true;
            if (activeFilter === 'Ages 3-5') matchesFilter = story.target_age <= 5;
            if (activeFilter === 'Ages 6-8') matchesFilter = story.target_age >= 6;
            // Add other category filters here if you have a 'category' column in your DB!
            return matchesSearch && matchesFilter;
        });
    }, [stories, deferredSearchQuery, activeFilter]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5, duration: 0.6 } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <div className="flex items-center gap-4 relative z-10">
                    <motion.div 
                        animate={{ rotate: [0, -10, 10, 0] }} 
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="bg-white p-3 rounded-[20px] border-[5px] border-emerald-300 shadow-[0_6px_0_#6ee7b7]"
                    >
                        <FaBookOpen className="w-8 h-8 text-emerald-500" />
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-emerald-600 drop-shadow-sm tracking-tight font-['Fredoka',sans-serif]">
                        Story Library
                    </h2>
                </div>
            }
        >
            <Head title="Library" />
            
            <div className="min-h-screen bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] pb-24 relative overflow-hidden font-['Fredoka',sans-serif]">
                <FloatingSparkles />

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-10 mt-8 px-4 sm:px-0 relative z-10">
                    
                    {/* --- CREATIVE SEARCH & FILTERS --- */}
                    <div className="flex flex-col xl:flex-row gap-6 justify-between items-center bg-white/80 backdrop-blur-md rounded-[40px] p-4 border-[6px] border-white shadow-sm">
                        
                        {/* Pill Filters */}
                        <div className="flex gap-3 overflow-x-auto w-full xl:w-auto scrollbar-hide px-2 py-2 custom-scrollbar">
                            {filters.map(filter => (
                                <button
                                    key={filter.name} 
                                    onClick={() => setActiveFilter(filter.name)}
                                    className={`whitespace-nowrap px-6 py-4 rounded-full font-black text-lg transition-all flex items-center gap-3 border-[4px] ${
                                        activeFilter === filter.name 
                                        ? 'bg-yellow-400 border-yellow-500 text-yellow-900 shadow-[0_6px_0_#ca8a04] translate-y-[-4px]' 
                                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:-translate-y-1 hover:shadow-[0_4px_0_#cbd5e1]'
                                    }`}
                                >
                                    {filter.icon}
                                    {filter.name}
                                </button>
                            ))}
                        </div>

                        {/* Chunky Search Bar */}
                        <div className="relative w-full xl:w-96 group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <FaSearch className="text-sky-400 w-6 h-6 group-focus-within:animate-bounce" />
                            </div>
                            <input
                                type="text" 
                                placeholder="Search for magic..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-sky-50 border-[5px] border-sky-200 text-slate-800 pl-16 pr-6 py-5 rounded-full font-black text-xl focus:outline-none focus:border-sky-400 focus:bg-white placeholder-sky-300 transition-all shadow-[inset_0_4px_8px_rgba(0,0,0,0.05)]"
                            />
                        </div>
                    </div>

                    {/* --- BOOK GRID --- */}
                    <motion.div 
                        variants={containerVariants} 
                        initial="hidden" 
                        animate="show" 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredStories.map((story) => (
                                <motion.div 
                                    key={story.id} 
                                    layout 
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.05, rotate: story.id % 2 === 0 ? 2 : -2, y: -10 }}
                                    className="bg-white rounded-[40px] border-[8px] border-white shadow-[0_15px_0_rgba(0,0,0,0.08)] p-5 flex flex-col group transition-colors hover:border-sky-100"
                                >
                                    {/* Cover Image Container */}
                                    <div className="h-64 rounded-[24px] overflow-hidden border-[5px] border-slate-100 relative bg-sky-50 mb-5 shadow-inner">
                                        <img src={story.cover_image} alt={story.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        
                                        {/* Age Badge */}
                                        <div className="absolute top-3 left-3 bg-pink-400 text-white text-sm font-black px-4 py-2 rounded-full border-[3px] border-pink-500 shadow-sm flex items-center gap-1">
                                            <FaMagic className="text-yellow-200" /> Age {story.target_age}+
                                        </div>

                                        {/* Overlay Play Icon */}
                                        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                            <motion.div 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="w-20 h-20 bg-yellow-400 border-[4px] border-yellow-500 rounded-full flex items-center justify-center text-yellow-900 shadow-[0_8px_0_#ca8a04] transition-transform"
                                            >
                                                <BiPlay className="w-12 h-12 ml-2" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-800 line-clamp-1 leading-tight tracking-tight">{story.title}</h3>
                                    <p className="text-slate-500 font-bold text-base line-clamp-2 mt-2 mb-6 flex-1 leading-relaxed">{story.description}</p>
                                    
                                    <Link 
                                        href={route('reader', story.id)} 
                                        className="flex items-center justify-center gap-3 w-full bg-emerald-400 text-emerald-950 font-black text-xl py-4 rounded-full border-[4px] border-emerald-500 shadow-[0_6px_0_#059669] group-hover:translate-y-1 group-hover:shadow-none transition-all"
                                    >
                                        <FaBookOpen className="w-5 h-5 text-emerald-100" />
                                        Read Now
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* --- EMPTY STATE --- */}
                    {filteredStories.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20, scale: 0.9 }} 
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="text-center py-24 bg-white/60 backdrop-blur-md rounded-[50px] border-[8px] border-white shadow-sm mt-8"
                        >
                            <motion.div 
                                animate={{ y: [0, -15, 0] }} 
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            >
                                <FaSadTear className="w-24 h-24 mx-auto text-sky-300 mb-6 drop-shadow-md" />
                            </motion.div>
                            <h3 className="text-5xl font-black text-slate-700 mb-4 tracking-tight">Oh no! No magic found.</h3>
                            <p className="text-slate-500 font-bold text-2xl">Try adjusting your filters or typing something else!</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}