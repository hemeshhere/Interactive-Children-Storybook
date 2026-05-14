import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaClock, FaStar, FaPlus, FaUserAstronaut, FaUserNinja } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function Dashboard({ auth }) {
    // MOCK DATA: Using React Icons for avatars
    const childrenProfiles = [
        { id: 1, name: 'Leo', age: 6, avatar: <FaUserAstronaut className="w-16 h-16 text-yellow-500" />, color: 'bg-yellow-300 border-yellow-400 text-yellow-900', shadow: 'shadow-[0_8px_0_#facc15]' },
        { id: 2, name: 'Maya', age: 4, avatar: <FaUserNinja className="w-16 h-16 text-pink-500" />, color: 'bg-pink-300 border-pink-400 text-pink-900', shadow: 'shadow-[0_8px_0_#f472b6]' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <HiSparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
                    <h2 className="text-4xl md:text-5xl font-black text-sky-600 drop-shadow-sm tracking-tight">
                        Welcome back, {auth.user.name}!
                    </h2>
                </div>
            }
        >
            <Head title="Family Dashboard" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-12">
                
                {/* --- CHUNKY STATS ROW --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 px-4 sm:px-0">
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-emerald-400 rounded-[30px] border-[6px] border-emerald-500 p-8 shadow-[0_10px_0_#059669] flex items-center gap-6 text-white overflow-hidden relative"
                    >
                        <div className="absolute -right-4 -top-4 opacity-20">
                            <FaBookOpen className="w-40 h-40" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl border-[4px] border-emerald-500 shadow-[0_4px_0_#059669] text-emerald-500 relative z-10">
                            <FaBookOpen className="w-10 h-10" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-black opacity-90 uppercase tracking-wider">Books Read</h3>
                            <p className="text-6xl font-black drop-shadow-md">14</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-indigo-400 rounded-[30px] border-[6px] border-indigo-500 p-8 shadow-[0_10px_0_#4338ca] flex items-center gap-6 text-white overflow-hidden relative"
                    >
                        <div className="absolute -right-4 -top-4 opacity-20">
                            <FaClock className="w-40 h-40" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl border-[4px] border-indigo-500 shadow-[0_4px_0_#4338ca] text-indigo-500 relative z-10">
                            <FaClock className="w-10 h-10" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-black opacity-90 uppercase tracking-wider">Reading Time</h3>
                            <p className="text-5xl font-black drop-shadow-md">12<span className="text-3xl ml-1">hrs</span></p>
                        </div>
                    </motion.div>
                </div>

                {/* --- CHILD PROFILES --- */}
                <div className="px-4 sm:px-0">
                    <h3 className="text-3xl font-black text-slate-700 mb-6 tracking-tight">Who is reading today?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        
                        {childrenProfiles.map((child) => (
                            <motion.div
                                key={child.id} 
                                whileHover={{ scale: 1.05, y: -5 }} 
                                whileTap={{ scale: 0.95 }}
                                className={`cursor-pointer rounded-[40px] border-[6px] p-8 ${child.color} ${child.shadow} transition-transform flex flex-col items-center text-center relative overflow-hidden`}
                            >
                                {/* Decorative corner sparkles */}
                                <HiSparkles className="absolute top-4 right-4 w-8 h-8 opacity-40" />

                                <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center border-[6px] border-inherit shadow-inner mb-6 z-10">
                                    {child.avatar}
                                </div>
                                <h4 className="text-4xl font-black z-10">{child.name}</h4>
                                
                                <div className="bg-white/50 px-5 py-2 rounded-full font-black mt-4 text-lg flex items-center gap-2 border-[3px] border-inherit z-10">
                                    <span>Age {child.age}</span>
                                    <span className="opacity-50">•</span>
                                    <FaStar className="text-yellow-500" />
                                    <span>{child.points}</span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Add Reader Card */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer bg-sky-50 rounded-[40px] border-[6px] border-dashed border-sky-300 p-8 flex flex-col items-center justify-center text-center min-h-[280px] hover:bg-sky-100 transition-colors"
                        >
                            <div className="bg-sky-200 text-sky-500 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner border-[4px] border-sky-300">
                                <FaPlus className="w-10 h-10" />
                            </div>
                            <h4 className="text-3xl font-black text-sky-500">Add Reader</h4>
                            <p className="text-sky-600 font-bold mt-2 opacity-80">Create a new profile</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}