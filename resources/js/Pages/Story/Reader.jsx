import { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause, FaHome, FaRedo, FaCheckCircle, FaBookmark } from 'react-icons/fa';

export default function Reader({ story }) {
    const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const bookRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!story || !story.pages || story.pages.length === 0) {
        return (
            <div className="min-h-screen bg-[#06080f] flex flex-col items-center justify-center p-6 font-['Fredoka',sans-serif]">
                <div className="bg-white p-10 rounded-[40px] border-[8px] border-slate-200 text-center shadow-[0_15px_0_rgba(0,0,0,0.3)]">
                    <div className="text-7xl mb-6">🛠️</div>
                    <h2 className="text-4xl font-black text-slate-800 mb-4">Book under construction!</h2>
                    <p className="text-xl font-bold text-slate-500 mb-8">This story doesn't have any pages in the database yet.</p>
                    <Link href={route('library')} className="bg-yellow-400 text-yellow-900 px-8 py-4 rounded-full font-black text-2xl shadow-[0_6px_0_#ca8a04] hover:translate-y-1 hover:shadow-none transition-all">
                        Go Back
                    </Link>
                </div>
            </div>
        );
    }

    const [currentPage, setCurrentPage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const [isFinishedReading, setIsFinishedReading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const currentData = story.pages[currentPage];
    const textContent = currentData.content || currentData.text || "No text available for this page.";
    const words = textContent.split(" ");
    const midpoint = Math.ceil(words.length / 2);
    const leftWords = words.slice(0, midpoint);
    const rightWords = words.slice(midpoint);

    // --- GENIUS 3D TILT EFFECT ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ['4deg', '-4deg']), { stiffness: 100, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ['-4deg', '4deg']), { stiffness: 100, damping: 25 });

    const handleMouseMove = (e) => {
        if (!bookRef.current) return;
        const rect = bookRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

    useEffect(() => {
        setHighlightIndex(-1);
        setIsPlaying(false);
        setIsFinishedReading(false);
        setShowConfetti(false);
    }, [currentPage]);

    // --- ACCESSIBLE KARAOKE ENGINE (SLOWED DOWN) ---
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setHighlightIndex((prev) => {
                    if (prev >= words.length - 1) { 
                        setIsPlaying(false); 
                        setIsFinishedReading(true);
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 3000); 
                        clearInterval(interval); 
                        return words.length; 
                    }
                    return prev + 1;
                });
            }, 500); 
        }
        return () => clearInterval(interval);
    }, [isPlaying, words.length]);

    const handlePlayPause = () => {
        if (isFinishedReading) {
            setHighlightIndex(-1);
            setIsFinishedReading(false);
            setShowConfetti(false);
            setIsPlaying(true);
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const nextPage = () => { if (currentPage < story.pages.length - 1) setCurrentPage(prev => prev + 1); };
    const prevPage = () => { if (currentPage > 0) setCurrentPage(prev => prev - 1); };

    const activeWordTransition = { type: "spring", stiffness: 300, damping: 15 };

    return (
        <div className="fixed inset-0 bg-[#06080f] flex flex-col font-['Fredoka',sans-serif] text-slate-800 overflow-hidden selection:bg-pink-400 selection:text-white">
            <Head title={`${story.title} - Virtual Hardcover`} />
            
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-[#0f172a] to-[#06080f]" />
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-sky-600/10 rounded-full blur-[120px]" 
                />
                {[...Array(25)].map((_, i) => (
                    <div key={i} className="absolute text-yellow-200/40 text-2xl animate-pulse" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDuration: `${3 + Math.random() * 5}s` }}>✦</div>
                ))}
            </div>

            {showConfetti && (
                <Confetti 
                    width={windowDimensions.width} height={windowDimensions.height}
                    numberOfPieces={200} recycle={false} gravity={0.3}
                    colors={['#f472b6', '#facc15', '#4ade80', '#38bdf8']} 
                    style={{ zIndex: 100 }}
                />
            )}

            <div className="absolute top-0 w-full p-4 md:p-6 flex justify-between items-center z-50 pointer-events-none">
                <Link 
                    href={route('library')} 
                    className="pointer-events-auto flex items-center gap-3 bg-white/5 backdrop-blur-md border-[3px] border-white/10 text-white font-black px-6 py-3 rounded-full hover:bg-white/15 transition-all text-lg md:text-xl shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                >
                    <FaHome className="w-6 h-6 text-yellow-300" />
                    <span className="hidden md:inline">Library</span>
                </Link>

                <div className="pointer-events-auto flex gap-2 md:gap-3 bg-white/5 px-5 py-3 rounded-full backdrop-blur-md border-[3px] border-white/10 items-center shadow-inner">
                    <FaBookmark className="text-pink-400 mr-2 hidden md:block" />
                    {story.pages.map((_, idx) => (
                        <div key={idx} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentPage ? 'bg-yellow-400 scale-125 shadow-[0_0_15px_#facc15]' : idx < currentPage ? 'bg-sky-400' : 'bg-slate-600'}`} />
                    ))}
                </div>
            </div>

            <div 
                ref={bookRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
                className="flex-1 flex items-center justify-center p-4 md:p-10 mt-16 md:mt-10 relative z-10 w-full max-w-7xl mx-auto perspective-[2000px]"
            >
                <button onClick={prevPage} disabled={currentPage === 0} className={`hidden md:flex absolute left-0 xl:left-[-20px] z-30 bg-white border-[5px] border-slate-200 w-20 h-20 rounded-full items-center justify-center shadow-[0_8px_0_#cbd5e1] hover:translate-y-1 hover:shadow-none transition-all text-sky-500 ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <FaArrowLeft className="w-8 h-8" />
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage} 
                        initial={{ opacity: 0, scale: 0.9, y: 30 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: -20 }} 
                        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                        className="w-full h-[75vh] md:h-[80vh] bg-indigo-700 rounded-[30px] md:rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] border-[5px] border-indigo-900 p-2 md:p-3 relative flex"
                    >
                        <motion.div 
                            animate={{ opacity: isFinishedReading ? [0.5, 1, 0.5] : 0.5 }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 opacity-50 blur-md pointer-events-none transform translate-z-[-1px]"
                        />

                        <div className="flex-1 bg-[#fefdfa] rounded-[24px] md:rounded-[32px] flex flex-col md:flex-row shadow-[inset_0_0_30px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden">
                            
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-300/60 to-transparent z-20 pointer-events-none" />

                            {/* --- LEFT PAGE --- */}
                            <div className="w-full md:w-1/2 h-[50%] md:h-full relative flex flex-col justify-center p-6 md:p-14 border-b-2 md:border-b-0 md:border-r border-slate-200/50 bg-[#fffefc]">
                                <div className="flex-1 overflow-y-auto pt-4 md:pt-10 scrollbar-hide">
                                    {/* 🟢 INCREASED LINE HEIGHT FOR READABILITY */}
                                    <h2 className="text-3xl md:text-5xl font-black leading-[1.8] text-slate-700 tracking-wide select-none">
                                        {leftWords.map((word, index) => {
                                            const isActive = index === highlightIndex;
                                            const isPast = index < highlightIndex;
                                            
                                            return (
                                                <motion.span 
                                                    key={`left-${index}`} layout
                                                    animate={isActive ? {
                                                        scale: [1, 1.1, 1.05], y: [0, -5, -2], rotate: [0, -2, 2, 0]
                                                    } : isPast ? { scale: 1, y: 0, rotate: 0 } : { scale: 1, y: 0, rotate: 0 }}
                                                    transition={activeWordTransition}
                                                    // 🟢 HIGH CONTRAST COLORS
                                                    className={`inline-block mr-2 md:mr-3 mb-3 px-2 py-1 rounded-2xl transition-all duration-200 origin-center ${
                                                        isActive 
                                                        ? 'bg-yellow-300 text-slate-900 shadow-[0_4px_0_#ca8a04] z-10 relative font-black' 
                                                        : isPast
                                                        ? 'text-slate-500 opacity-90' 
                                                        : 'text-slate-700 hover:text-sky-500 transition-colors'
                                                    }`}
                                                >
                                                    {word}
                                                </motion.span>
                                            );
                                        })}
                                    </h2>
                                </div>
                                <div className="hidden md:block absolute bottom-6 left-8 font-black text-slate-300 text-xl bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200">
                                    {(currentPage * 2) + 1}
                                </div>
                            </div>

                            {/* --- RIGHT PAGE --- */}
                            <div className="w-full md:w-1/2 h-[50%] md:h-full relative flex flex-col justify-center p-6 md:p-14 bg-[#fefdfa]">
                                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30">
                                    <motion.div animate={showConfetti ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}>
                                        <button 
                                            onClick={handlePlayPause}
                                            className={`relative w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-[0_8px_0_rgba(0,0,0,0.15)] transition-all border-[4px] md:border-[5px] ${
                                                isFinishedReading 
                                                ? 'bg-sky-400 border-sky-500 text-white hover:translate-y-1 hover:shadow-none' 
                                                : isPlaying 
                                                ? 'bg-pink-400 border-pink-500 text-white hover:translate-y-1 hover:shadow-none' 
                                                : 'bg-emerald-400 border-emerald-500 text-white hover:translate-y-1 hover:shadow-[0_3px_0_rgba(0,0,0,0.15)]'
                                            }`}
                                        >
                                            {isFinishedReading && <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md animate-pulse pointer-events-none z-[-1]" />}
                                            {isFinishedReading ? <FaRedo className="w-6 h-6 md:w-8 md:h-8" /> : isPlaying ? <FaPause className="w-6 h-6 md:w-8 md:h-8" /> : <FaPlay className="w-6 h-6 md:w-8 md:h-8 ml-1 md:ml-2" />}
                                        </button>
                                    </motion.div>
                                </div>

                                <div className="flex-1 overflow-y-auto pt-4 md:pt-28 scrollbar-hide">
                                    <h2 className="text-3xl md:text-5xl font-black leading-[1.8] text-slate-700 tracking-wide select-none">
                                        {rightWords.map((word, index) => {
                                            const trueIndex = midpoint + index;
                                            const isActive = trueIndex === highlightIndex;
                                            const isPast = trueIndex < highlightIndex;
                                            
                                            return (
                                                <motion.span 
                                                    key={`right-${index}`} layout
                                                    animate={isActive ? {
                                                        scale: [1, 1.1, 1.05], y: [0, -5, -2], rotate: [0, 2, -2, 0]
                                                    } : isPast ? { scale: 1, y: 0, rotate: 0 } : { scale: 1, y: 0, rotate: 0 }}
                                                    transition={activeWordTransition}
                                                    className={`inline-block mr-2 md:mr-3 mb-3 px-2 py-1 rounded-2xl transition-all duration-200 origin-center ${
                                                        isActive 
                                                        ? 'bg-yellow-300 text-slate-900 shadow-[0_4px_0_#ca8a04] z-10 relative font-black' 
                                                        : isPast
                                                        ? 'text-slate-500 opacity-90' 
                                                        : 'text-slate-700 hover:text-sky-500 transition-colors'
                                                    }`}
                                                >
                                                    {word}
                                                </motion.span>
                                            );
                                        })}
                                    </h2>
                                </div>
                                <div className="hidden md:block absolute bottom-6 right-8 font-black text-slate-300 text-xl bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200">
                                    {(currentPage * 2) + 2}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="hidden md:flex absolute right-0 xl:right-[-20px] z-30">
                    {currentPage === story.pages.length - 1 ? (
                        <motion.div animate={isFinishedReading ? { scale: [1, 1.1, 1] } : {}} transition={{ repeat: Infinity, duration: 1 }}>
                            <Link href={route('library')} className="bg-emerald-400 border-[6px] border-emerald-500 px-8 py-5 rounded-full flex items-center gap-3 shadow-[0_8px_0_#059669] hover:translate-y-1 hover:shadow-none transition-all text-white font-black text-2xl">
                                <FaCheckCircle /> Finish
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div animate={isFinishedReading ? { scale: [1, 1.2, 1], x: [0, 5, 0] } : {}} transition={{ repeat: Infinity, duration: 1 }}>
                            <button onClick={nextPage} className={`bg-yellow-400 border-[6px] border-yellow-500 w-20 h-20 rounded-full flex items-center justify-center shadow-[0_8px_0_#ca8a04] hover:translate-y-1 hover:shadow-none transition-all text-yellow-900 ${isFinishedReading ? 'shadow-[0_0_20px_rgba(250,204,21,0.8)]' : ''}`}>
                                <FaArrowRight className="w-8 h-8" />
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="md:hidden absolute bottom-4 w-full px-4 flex justify-between items-center z-40 pointer-events-none">
                <button onClick={prevPage} disabled={currentPage === 0} className={`pointer-events-auto bg-white border-[4px] border-slate-200 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_6px_0_#cbd5e1] text-sky-500 transition-opacity ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <FaArrowLeft className="w-5 h-5" />
                </button>
                
                {currentPage === story.pages.length - 1 ? (
                    <Link href={route('library')} className="pointer-events-auto bg-emerald-400 border-[4px] border-emerald-500 px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_6px_0_#059669] text-white font-black text-lg">
                        <FaCheckCircle /> Finish
                    </Link>
                ) : (
                    <motion.div animate={isFinishedReading ? { scale: [1, 1.1, 1], x: [0, 3, 0] } : {}} transition={{ repeat: Infinity, duration: 1 }} className="pointer-events-auto">
                        <button onClick={nextPage} className={`bg-yellow-400 border-[4px] border-yellow-500 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_6px_0_#ca8a04] text-yellow-900 ${isFinishedReading ? 'shadow-[0_0_15px_rgba(250,204,21,0.8)]' : ''}`}>
                            <FaArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}