import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaBookOpen, FaClock, FaPlus, FaUserAstronaut, 
    FaUserNinja, FaRobot, FaCat, FaTimes, FaTrophy, 
    FaBook, FaBirthdayCake, FaUser, FaMagic, FaSadTear, 
    FaRocket, FaStar, FaFire 
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

// --- CUSTOM ANIMATED STARS COMPONENT ---
const FloatingStars = () => {
    const [stars, setStars] = useState([]);
    useEffect(() => {
        setStars([...Array(15)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() > 0.5 ? 'text-yellow-300' : 'text-sky-300',
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 4
        })));
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    initial={{ y: 0, opacity: 0.2, rotate: 0 }}
                    animate={{ y: -100, opacity: [0.2, 0.8, 0.2], rotate: 180 }}
                    transition={{ repeat: Infinity, duration: star.duration, delay: star.delay, ease: "linear" }}
                    className={`absolute ${star.size} opacity-50`}
                    style={{ left: star.left, top: star.top }}
                >
                    ✦
                </motion.div>
            ))}
        </div>
    );
};

export default function Dashboard({ auth, profiles, familyStats }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [statsProfile, setStatsProfile] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', age: '', avatar: 'FaUserAstronaut', 
    });

    const renderAvatar = (iconName, classes = "w-20 h-20") => {
        const icons = {
            'FaUserAstronaut': <FaUserAstronaut className={`${classes} text-yellow-500`} />,
            'FaUserNinja': <FaUserNinja className={`${classes} text-pink-500`} />,
            'FaRobot': <FaRobot className={`${classes} text-sky-500`} />,
            'FaCat': <FaCat className={`${classes} text-emerald-500`} />
        };
        return icons[iconName] || <FaUserAstronaut className={`${classes} text-slate-500`} />;
    };

    const submitProfile = (e) => {
        e.preventDefault();
        post(route('profiles.store'), {
            onSuccess: () => { setIsCreateModalOpen(false); reset(); },
        });
    };

    const selectProfile = (profileId) => {
        router.post(route('profiles.activate', profileId));
    };

    const openStats = (e, profile) => {
        e.stopPropagation(); 
        setStatsProfile(profile);
    };

    // --- BOUNCY PHYSICS ANIMATIONS ---
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.6, duration: 0.8 } }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between w-full relative z-10">
                    <div className="flex items-center gap-4">
                        <motion.div 
                            animate={{ rotate: [0, 10, -10, 0] }} 
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="bg-white p-3 rounded-[20px] border-[5px] border-sky-300 shadow-[0_6px_0_#7dd3fc]"
                        >
                            <FaRocket className="w-8 h-8 text-sky-500" />
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black text-sky-600 drop-shadow-sm tracking-tight" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                            Are you ready to dive in the world of books?
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Family Dashboard" />

            <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden pb-20 font-['Fredoka',sans-serif]">
                <FloatingStars />

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-10 pt-8 relative z-10">
                    
                    {/* --- EXPANDED PARENT ANALYTICS --- */}
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-[40px] border-[6px] border-white shadow-sm px-4 sm:px-8">
                        <h3 className="text-2xl font-black text-slate-700 mb-6 flex items-center gap-3">
                            <FaClock className="text-indigo-400" /> Family Analytics
                        </h3>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {/* Card 1: Books */}
                            <div className="bg-emerald-400 rounded-3xl border-[5px] border-emerald-500 p-5 shadow-[0_6px_0_#059669] text-white hover:-translate-y-1 transition-transform relative overflow-hidden group">
                                <FaBookOpen className="absolute -right-4 -top-4 w-24 h-24 opacity-20 group-hover:scale-110 transition-transform" />
                                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider mb-1 relative z-10">Books Read</h3>
                                <p className="text-4xl sm:text-5xl font-black relative z-10">{familyStats.books_read}</p>
                            </div>

                            {/* Card 2: Time */}
                            <div className="bg-indigo-400 rounded-3xl border-[5px] border-indigo-500 p-5 shadow-[0_6px_0_#4338ca] text-white hover:-translate-y-1 transition-transform relative overflow-hidden group">
                                <FaClock className="absolute -right-4 -top-4 w-24 h-24 opacity-20 group-hover:scale-110 transition-transform" />
                                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider mb-1 relative z-10">Total Time</h3>
                                <div className="flex items-baseline gap-1 relative z-10">
                                    <p className="text-4xl sm:text-5xl font-black">{familyStats.reading_time_hours}<span className="text-xl sm:text-2xl ml-1">h</span></p>
                                    <p className="text-2xl font-black">{familyStats.reading_time_minutes}<span className="text-base ml-1">m</span></p>
                                </div>
                            </div>

                            {/* Card 3: Magic Points */}
                            <div className="bg-amber-400 rounded-3xl border-[5px] border-amber-500 p-5 shadow-[0_6px_0_#d97706] text-white hover:-translate-y-1 transition-transform relative overflow-hidden group">
                                <FaStar className="absolute -right-4 -top-4 w-24 h-24 opacity-20 group-hover:scale-110 transition-transform" />
                                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider mb-1 relative z-10">Magic Points</h3>
                                <p className="text-4xl sm:text-5xl font-black relative z-10">{familyStats.total_points}</p>
                            </div>

                            {/* Card 4: Reading Pace */}
                            <div className="bg-pink-400 rounded-3xl border-[5px] border-pink-500 p-5 shadow-[0_6px_0_#db2777] text-white hover:-translate-y-1 transition-transform relative overflow-hidden group">
                                <FaFire className="absolute -right-4 -top-4 w-24 h-24 opacity-20 group-hover:scale-110 transition-transform" />
                                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider mb-1 relative z-10">Avg Pace</h3>
                                <p className="text-4xl sm:text-5xl font-black relative z-10">{familyStats.avg_pace}<span className="text-xl sm:text-2xl ml-1">m/book</span></p>
                            </div>
                        </div>
                    </div>

                    {/* --- MAIN INTERACTIVE KIDS ZONE --- */}
                    <div className="px-4 sm:px-0 mt-12">
                        <motion.h3 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl md:text-5xl font-black text-slate-700 text-center mb-10 tracking-tight"
                        >
                            Choose your character! ✨
                        </motion.h3>
                        
                        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            
                            {profiles.map((child) => (
                                <motion.div
                                    variants={cardVariants}
                                    key={child.id} 
                                    onClick={() => selectProfile(child.id)} 
                                    whileHover={{ scale: 1.05, rotate: child.id % 2 === 0 ? 2 : -2, y: -10 }} 
                                    whileTap={{ scale: 0.9, rotate: 0 }}
                                    className={`cursor-pointer rounded-[50px] border-[8px] p-8 ${child.color} ${child.shadow} transition-colors flex flex-col items-center text-center relative overflow-hidden group`}
                                >
                                    <button 
                                        onClick={(e) => openStats(e, child)}
                                        className="absolute top-4 left-4 bg-white/80 hover:bg-white border-[4px] border-inherit px-4 py-2 rounded-full font-black text-sm flex items-center gap-2 z-20 shadow-sm transition-transform hover:scale-110"
                                    >
                                        <FaTrophy className="text-yellow-500" /> Progress
                                    </button>

                                    <HiSparkles className="absolute top-6 right-6 w-10 h-10 opacity-30 group-hover:opacity-100 group-hover:animate-spin transition-opacity text-white" />
                                    
                                    <motion.div 
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ repeat: Infinity, duration: 2.5 + (child.id * 0.2), ease: "easeInOut" }}
                                        className="bg-white w-40 h-40 rounded-full flex items-center justify-center border-[8px] border-inherit shadow-[inset_0_8px_15px_rgba(0,0,0,0.1)] mb-6 z-10 mt-8"
                                    >
                                        {renderAvatar(child.avatar)}
                                    </motion.div>

                                    <h4 className="text-5xl font-black z-10 tracking-tight drop-shadow-sm mb-4">{child.name}</h4>
                                    
                                    <div className="flex gap-3 z-10 w-full px-4">
                                        <div className="bg-white/80 px-4 py-3 rounded-full font-black text-lg flex-1 border-[4px] border-inherit flex items-center justify-center gap-2 shadow-sm text-slate-700">
                                            <FaBirthdayCake className="text-pink-500" /> {child.age}
                                        </div>
                                        <div className="bg-white/80 px-4 py-3 rounded-full font-black text-lg flex-1 border-[4px] border-inherit flex items-center justify-center gap-2 shadow-sm text-slate-700">
                                            <FaBook className="text-emerald-500" /> {child.books_read}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div
                                variants={cardVariants}
                                whileHover={{ scale: 1.05, rotate: -2, y: -10 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsCreateModalOpen(true)} 
                                className="cursor-pointer bg-sky-50/80 rounded-[50px] border-[8px] border-dashed border-sky-300 p-8 flex flex-col items-center justify-center text-center min-h-[350px] hover:bg-sky-100 hover:border-sky-400 transition-colors shadow-sm group backdrop-blur-sm"
                            >
                                <motion.div 
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="bg-white text-sky-400 w-28 h-28 rounded-[30px] flex items-center justify-center mb-6 shadow-sm border-[6px] border-sky-200 group-hover:bg-sky-400 group-hover:text-white transition-colors"
                                >
                                    <FaPlus className="w-12 h-12" />
                                </motion.div>
                                <h4 className="text-4xl font-black text-sky-500 tracking-tight">New Hero</h4>
                                <p className="text-sky-400 font-bold mt-2 text-xl">Create a profile</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- PLAYFUL PROGRESS MODAL --- */}
            <AnimatePresence>
                {statsProfile && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md font-['Fredoka',sans-serif]">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5, y: 100, rotate: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 100, rotate: -10 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className={`${statsProfile.color.split(' ')[0]} rounded-[50px] border-[10px] border-white p-8 max-w-3xl w-full shadow-[0_25px_0_rgba(0,0,0,0.2)] relative max-h-[85vh] flex flex-col`}
                        >
                            <button onClick={() => setStatsProfile(null)} className="absolute top-6 right-6 bg-white/20 hover:bg-white text-white hover:text-slate-800 p-3 rounded-full transition-colors z-10 border-[4px] border-transparent hover:border-slate-800">
                                <FaTimes className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b-[6px] border-white/30 pb-8 text-center md:text-left">
                                <div className="bg-white p-4 rounded-full border-[8px] border-inherit shadow-inner">
                                    {renderAvatar(statsProfile.avatar, 'w-24 h-24')}
                                </div>
                                <div>
                                    <h2 className="text-5xl md:text-6xl font-black text-white drop-shadow-md tracking-tight mb-4">{statsProfile.name}'s Trophies</h2>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <span className="bg-yellow-400 text-yellow-900 px-5 py-2 rounded-full font-black text-lg flex items-center gap-2 border-[4px] border-yellow-500 shadow-[0_4px_0_#ca8a04]">
                                            <FaMagic /> {statsProfile.points} Points
                                        </span>
                                        <span className="bg-sky-400 text-white px-5 py-2 rounded-full font-black text-lg flex items-center gap-2 border-[4px] border-sky-500 shadow-[0_4px_0_#0284c7]">
                                            <FaClock /> {statsProfile.reading_time_minutes} Mins
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="overflow-y-auto pr-4 grid grid-cols-2 sm:grid-cols-3 gap-6 pb-4 custom-scrollbar">
                                {statsProfile.stories && statsProfile.stories.length > 0 ? (
                                    statsProfile.stories.map(story => (
                                        <motion.div whileHover={{ y: -8, scale: 1.05 }} key={story.id} className="bg-white rounded-[30px] border-[8px] border-white overflow-hidden shadow-[0_8px_0_rgba(0,0,0,0.1)] relative group cursor-pointer">
                                            <img src={story.cover_image} alt={story.title} className="w-full h-48 object-cover" />
                                            <div className="absolute bottom-0 w-full bg-slate-900/90 p-3 border-t-[4px] border-white/20">
                                                <p className="text-white font-black text-sm md:text-base truncate text-center">{story.title}</p>
                                            </div>
                                            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 p-2 rounded-full border-[3px] border-yellow-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                <FaTrophy />
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-full bg-black/10 p-12 rounded-[40px] text-center border-[6px] border-dashed border-white/40 flex flex-col items-center">
                                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-white/20 p-6 rounded-full mb-6">
                                            <FaSadTear className="text-7xl text-white drop-shadow-sm" />
                                        </motion.div>
                                        <p className="text-4xl font-black text-white drop-shadow-sm">No books yet!</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- CREATE PROFILE MODAL --- */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md font-['Fredoka',sans-serif]">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 100 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="bg-white rounded-[50px] border-[10px] border-slate-200 w-full max-w-lg shadow-[0_25px_0_rgba(0,0,0,0.2)] relative overflow-hidden"
                        >
                            <div className="bg-sky-400 p-10 text-center relative overflow-hidden">
                                <HiSparkles className="absolute top-6 left-6 text-yellow-300 w-10 h-10 animate-spin-slow" />
                                <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-6 right-6 bg-black/10 hover:bg-white text-white hover:text-slate-800 p-3 rounded-full transition-colors z-10 border-[4px] border-transparent hover:border-slate-800">
                                    <FaTimes className="w-6 h-6" />
                                </button>
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 border-[6px] border-sky-200 shadow-inner">
                                    <FaUserAstronaut className="w-12 h-12 text-sky-500" />
                                </motion.div>
                                <h2 className="text-5xl font-black text-white tracking-tight drop-shadow-sm">New Hero</h2>
                            </div>

                            <form onSubmit={submitProfile} className="p-10 space-y-8 bg-[#f8fafc]">
                                <div>
                                    <label className="block text-2xl font-black text-slate-700 mb-3">What's their name?</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-2xl" />
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-white border-[5px] border-slate-300 rounded-[24px] pl-16 pr-6 py-5 text-2xl font-black text-slate-700 focus:border-sky-400 focus:ring-0 shadow-[0_4px_0_#cbd5e1] focus:shadow-[0_4px_0_#38bdf8] transition-all outline-none" placeholder="E.g. Leo" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-2xl font-black text-slate-700 mb-3">How old are they?</label>
                                    <div className="relative">
                                        <FaBirthdayCake className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-2xl" />
                                        <input type="number" min="1" max="18" value={data.age} onChange={e => setData('age', e.target.value)} className="w-full bg-white border-[5px] border-slate-300 rounded-[24px] pl-16 pr-6 py-5 text-2xl font-black text-slate-700 focus:border-sky-400 focus:ring-0 shadow-[0_4px_0_#cbd5e1] focus:shadow-[0_4px_0_#38bdf8] transition-all outline-none" placeholder="E.g. 6" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-2xl font-black text-slate-700 mb-4">Pick an Avatar!</label>
                                    <div className="flex justify-between gap-4">
                                        {['FaUserAstronaut', 'FaUserNinja', 'FaRobot', 'FaCat'].map(icon => (
                                            <button type="button" key={icon} onClick={() => setData('avatar', icon)} className={`flex-1 aspect-square rounded-[24px] border-[5px] flex items-center justify-center transition-all ${data.avatar === icon ? 'border-sky-400 bg-sky-100 scale-110 shadow-[0_6px_0_#38bdf8]' : 'border-slate-300 bg-white hover:bg-slate-50 hover:-translate-y-1 hover:shadow-[0_6px_0_#cbd5e1]'}`}>
                                                {renderAvatar(icon, 'w-12 h-12')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} type="submit" disabled={processing} className="w-full bg-emerald-400 text-white font-black text-3xl py-6 rounded-[24px] border-[6px] border-emerald-500 shadow-[0_8px_0_#059669] hover:translate-y-1 hover:shadow-none transition-all mt-8 disabled:opacity-50 flex items-center justify-center gap-3">
                                    <FaPlus /> Create Profile!
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}