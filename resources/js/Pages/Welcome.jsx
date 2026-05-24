import { Head, Link } from '@inertiajs/react';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    AnimatePresence
} from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaBookOpen,
    FaGamepad,
    FaRocket,
    FaStar,
    FaMagic,
    FaCloud,
    FaCrown
} from 'react-icons/fa';
import {
    FaPlay,
    FaClapperboard
} from "react-icons/fa6";
import {
    GiSpellBook,
    GiPartyPopper,
    GiCrystalBall,
    GiDragonHead,
    GiFairyWand
} from 'react-icons/gi';
import {
    HiSparkles,
} from 'react-icons/hi2';

export default function Welcome({ auth }) {
    const { scrollYProgress } = useScroll();
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // =========================================
    // MOBILE DETECTION
    // =========================================
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // =========================================
    // PARALLAX TIMELINES
    // =========================================
    const cloudX = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const cloudXReverse = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const balloonY = useTransform(scrollYProgress, [0, 1], ['0px', '-800px']);
    const rainbowRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '15deg']);

    // =========================================
    // SCROLL TO TOP
    // =========================================
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const stars = [...Array(isMobile ? 12 : 25)];

    return (
        <div className="relative overflow-hidden bg-[#7dd3fc] font-['Fredoka',sans-serif] text-slate-800 selection:bg-pink-400 selection:text-white">
            <Head title="MagicBooks.io - Fun Stories for Kids!" />

            {/* ========================================= */}
            {/* MAGICAL SKY BACKGROUND (FIXED) */}
            {/* ========================================= */}
            <div className="fixed inset-0 -z-50 bg-gradient-to-b from-sky-300 via-sky-200 to-indigo-100" />

            {/* SUN */}
            <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="fixed top-24 right-[-20px] md:right-20 w-40 h-40 md:w-56 md:h-56 bg-yellow-300 rounded-full blur-[2px] shadow-[0_0_80px_rgba(253,224,71,0.8)] -z-20"
            />

            {/* RAINBOW */}
            <motion.div
                style={{ rotate: rainbowRotate }}
                className="fixed top-[-5%] md:top-[5%] left-1/2 -translate-x-1/2 -z-30 opacity-70 pointer-events-none scale-110 md:scale-100"
            >
                <div className="w-[800px] h-[400px] rounded-t-full border-[50px] border-pink-400 border-b-0" />
                <div className="absolute top-10 left-10 w-[720px] h-[360px] rounded-t-full border-[40px] border-yellow-300 border-b-0" />
                <div className="absolute top-[80px] left-[80px] w-[640px] h-[320px] rounded-t-full border-[40px] border-emerald-400 border-b-0" />
            </motion.div>

            {/* FLOATING SPARKLES */}
            {stars.map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="fixed text-yellow-200 text-xl md:text-3xl -z-10 pointer-events-none"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{ y: [0, -15, 0], rotate: [0, 15, -15, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
                >
                    <HiSparkles />
                </motion.div>
            ))}

            {/* CLOUDS */}
            <motion.div style={{ x: cloudX }} className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-32 left-4 md:left-10 w-40 md:w-52 h-16 md:h-24 bg-white rounded-full opacity-90 shadow-sm" />
                <div className="absolute top-52 right-10 md:right-20 w-56 md:w-72 h-20 md:h-28 bg-white rounded-full opacity-90 shadow-sm" />
            </motion.div>
            <motion.div style={{ x: cloudXReverse }} className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-80 left-20 md:left-40 w-32 md:w-44 h-12 md:h-20 bg-white/80 rounded-full shadow-sm" />
            </motion.div>

            {/* ========================================= */}
            {/* BOUNCY STICKY NAVBAR */}
            {/* ========================================= */}
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
                <div className="bg-white/95 backdrop-blur-sm border-[4px] md:border-[6px] border-white rounded-full px-4 md:px-8 py-3 md:py-4 shadow-[0_8px_0_rgba(0,0,0,0.1)] md:shadow-[0_12px_0_rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between">
                        
                        {/* Logo */}
                        <motion.div onClick={scrollToTop} whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-pink-400 p-2 rounded-full text-white shadow-[0_4px_0_#be185d] hidden md:block">
                                <GiFairyWand className="text-2xl" />
                            </div>
                            <h1 className="text-2xl md:text-4xl font-black text-sky-500 drop-shadow-sm tracking-tight">
                                MagicBooks<span className="text-yellow-400">.io</span>
                            </h1>
                        </motion.div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#stories" className="font-bold text-slate-500 hover:text-pink-500 hover:-translate-y-1 transition-all text-xl">Stories</a>
                            <a href="https://kids.nationalgeographic.com/games/puzzles/" className="font-bold text-slate-500 hover:text-pink-500 hover:-translate-y-1 transition-all text-xl">Games</a>
                            
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="bg-sky-400 text-white px-8 py-3 rounded-full font-black shadow-[0_6px_0_#0284c7] hover:translate-y-1 hover:shadow-[0_2px_0_#0284c7] active:translate-y-2 active:shadow-none transition-all text-xl border-[3px] border-sky-300">
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center gap-6">
                                    <Link href={route('login')} className="font-black text-slate-500 hover:text-sky-500 text-xl transition-colors">
                                        Log in
                                    </Link>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link href={route('register')} className="bg-yellow-400 text-yellow-900 px-8 py-3 rounded-full font-black shadow-[0_6px_0_#ca8a04] hover:translate-y-1 hover:shadow-[0_2px_0_#ca8a04] active:translate-y-2 active:shadow-none transition-all text-xl tracking-wide border-[3px] border-yellow-300">
                                            Play Now!
                                        </Link>
                                    </motion.div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Hamburger Button */}
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden bg-sky-100 p-3 rounded-full text-sky-500 font-black border-[3px] border-sky-200 shadow-[0_4px_0_#bae6fd]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="absolute top-24 left-0 w-full bg-white border-[6px] border-white rounded-[30px] p-4 shadow-[0_12px_0_rgba(0,0,0,0.1)] flex flex-col gap-3 md:hidden z-40"
                        >
                            <a href="#stories" onClick={() => setMobileMenuOpen(false)} className="font-black text-slate-600 text-xl text-center bg-slate-50 py-4 rounded-2xl active:bg-slate-100 border-2 border-transparent">Stories</a>
                            <a href="https://kids.nationalgeographic.com/games/puzzles/" onClick={() => setMobileMenuOpen(false)} className="font-black text-slate-600 text-xl text-center bg-slate-50 py-4 rounded-2xl active:bg-slate-100 border-2 border-transparent">Games</a>
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="bg-sky-400 text-white text-center py-4 rounded-2xl font-black shadow-[0_6px_0_#0284c7] text-xl mt-2">Go to Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="font-black text-pink-500 text-xl text-center bg-pink-50 border-2 border-pink-100 py-4 rounded-2xl mt-2">Log in</Link>
                                    <Link href={route('register')} className="bg-yellow-400 text-yellow-900 text-center py-4 rounded-2xl font-black shadow-[0_6px_0_#ca8a04] text-xl">Play Now!</Link>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ========================================= */}
            {/* HERO SECTION */}
            {/* ========================================= */}
            <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center px-4 md:px-6 pt-40 pb-32">
                
                {/* Parallax Hot Air Balloon */}
                <motion.div
                    style={{ y: balloonY }} animate={{ rotate: [-4, 4, -4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-[5%] top-[30%] hidden lg:flex flex-col items-center pointer-events-none z-10"
                >
                    <div className="w-40 h-48 bg-pink-500 rounded-t-full rounded-b-3xl border-[8px] border-white shadow-[0_12px_0_rgba(0,0,0,0.1)] relative overflow-hidden">
                        <div className="absolute top-10 w-full h-6 bg-yellow-300" />
                        <div className="absolute top-28 w-full h-6 bg-sky-300" />
                    </div>
                    <div className="w-16 h-16 bg-amber-600 rounded-xl border-[6px] border-white shadow-[0_8px_0_rgba(0,0,0,0.1)] mt-3 flex items-center justify-center">
                        <FaStar className="text-yellow-300 text-xl" />
                    </div>
                </motion.div>

                <div className="relative z-20 max-w-5xl mx-auto text-center w-full">
                    
                    {/* Cute Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: 'spring', bounce: 0.6 }}
                        className="inline-flex items-center gap-2 md:gap-3 bg-white px-5 md:px-8 py-2 md:py-3 rounded-full border-[4px] md:border-[6px] border-white shadow-[0_6px_0_rgba(0,0,0,0.1)] mb-8"
                    >
                        <span className="text-2xl md:text-3xl animate-pulse"><FaCrown className="text-yellow-400" /></span>
                        <span className="font-black text-slate-600 text-sm md:text-xl tracking-wide uppercase">Award Winning Stories</span>
                    </motion.div>

                    {/* Hero Text */}
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.4, duration: 1 }}
                        className="text-6xl md:text-8xl lg:text-[9rem] leading-[1.1] md:leading-[1] font-black text-white drop-shadow-[0_8px_0_rgba(0,0,0,0.15)] tracking-tight"
                    >
                        Read. Explore. <br />
                        <span className="text-yellow-300 drop-shadow-[0_8px_0_#ca8a04]">Imagine!</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                        className="mt-8 md:mt-10 text-xl md:text-3xl leading-relaxed text-sky-900 max-w-3xl mx-auto font-bold px-4"
                    >
                        Jump into magical worlds where words come alive! The fun way for kids to learn and love reading.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-5 md:gap-8 px-4"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                            <Link
                                href={route('register')}
                                className="flex items-center justify-center gap-4 bg-yellow-400 text-yellow-900 text-xl md:text-3xl px-8 md:px-14 py-5 md:py-7 rounded-full font-black shadow-[0_10px_0_#ca8a04] hover:translate-y-1 hover:shadow-[0_6px_0_#ca8a04] active:translate-y-3 active:shadow-none transition-all w-full tracking-wide border-[4px] border-white"
                            >
                                <FaRocket className="text-2xl md:text-4xl" />
                                <span>Start Adventure</span>
                            </Link>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto bg-pink-400 text-white text-xl md:text-3xl px-8 md:px-14 py-5 md:py-7 rounded-full font-black shadow-[0_10px_0_#be185d] hover:translate-y-1 hover:shadow-[0_6px_0_#be185d] active:translate-y-3 active:shadow-none transition-all tracking-wide border-[4px] border-white"
                        >
                            <Link href="#demo" className="flex items-center justify-center gap-4">
                                <div className="bg-white text-pink-500 rounded-full p-2">
                                    <FaPlay className="text-lg md:text-xl translate-x-[2px]" />
                                </div>
                                <span>Watch Demo</span>
                            </Link>
                        </motion.button>
                    </motion.div>
                </div>
                <motion.div
                    style={{ y: balloonY }}
                    animate={{ rotate: [-2, 4, -4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-[4%] top-[28%] hidden lg:flex flex-col items-center pointer-events-none z-10"
                    >
                    {/* Flying Book */}
                    <div className="relative w-52 h-36">
                        
                        {/* Left Page */}
                        <div className="absolute left-0 top-0 w-1/2 h-full bg-amber-100 border-[6px] border-white rounded-l-3xl shadow-[0_12px_0_rgba(0,0,0,0.1)] overflow-hidden">
                        <div className="absolute top-5 left-4 w-16 h-2 bg-pink-300 rounded-full" />
                        <div className="absolute top-10 left-4 w-20 h-2 bg-sky-300 rounded-full" />
                        <div className="absolute top-16 left-4 w-14 h-2 bg-yellow-300 rounded-full" />
                        </div>

                        {/* Right Page */}
                        <div className="absolute right-0 top-0 w-1/2 h-full bg-orange-50 border-[6px] border-white rounded-r-3xl shadow-[0_12px_0_rgba(0,0,0,0.1)] overflow-hidden">
                        <div className="absolute top-5 right-4 w-16 h-2 bg-purple-300 rounded-full" />
                        <div className="absolute top-10 right-4 w-20 h-2 bg-green-300 rounded-full" />
                        <div className="absolute top-16 right-4 w-14 h-2 bg-rose-300 rounded-full" />
                        </div>

                        {/* Spine */}
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-full bg-red-400 border-x-[4px] border-white rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* WAVY DIVIDER (Sky to Purple) */}
            <div className="relative w-full h-24 md:h-48 -mb-1 z-20">
                <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full object-cover" preserveAspectRatio="none">
                    <path fill="#a855f7" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,170.7C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* ========================================= */}
            {/* FEATURED BOOKS SECTION (NEW) */}
            {/* ========================================= */}
            <section id="stories" className="relative py-20 md:py-32 bg-purple-500 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 md:mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.15)] tracking-tight"
                        >
                            Explore Magical Worlds
                        </motion.h2>
                        <p className="mt-6 text-xl md:text-3xl text-purple-200 font-bold">New adventures added every week!</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 px-4 md:px-10">
                        <BookCard 
                            title="The Sleepy Dragon" 
                            color="bg-emerald-400" 
                            shadow="shadow-[0_12px_0_#059669]" 
                            icon={<GiDragonHead />}
                            delay={0.1}
                        />
                        <BookCard 
                            title="Space Puppy" 
                            color="bg-sky-400" 
                            shadow="shadow-[0_12px_0_#0284c7]" 
                            icon={<FaRocket />}
                            delay={0.2}
                            featured
                        />
                        <BookCard 
                            title="Mystery of the Lost Wand" 
                            color="bg-pink-400" 
                            shadow="shadow-[0_12px_0_#be185d]" 
                            icon={<GiFairyWand />}
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* WAVY DIVIDER (Purple to Emerald) */}
            <div className="relative w-full h-24 md:h-48 -mb-1 z-20">
                <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full object-cover bg-purple-500" preserveAspectRatio="none">
                    <path fill="#34d399" fillOpacity="1" d="M0,96L60,117.3C120,139,240,181,360,186.7C480,192,600,160,720,138.7C840,117,960,107,1080,117.3C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>

            {/* ========================================= */}
            {/* FEATURES (The Hills) */}
            {/* ========================================= */}
            <section id="features" className="relative py-24 md:py-40 px-4 md:px-6 bg-emerald-400">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 md:mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.15)] tracking-tight px-2"
                        >
                            Why Kids Love Us!
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <FunCard icon={<FaBookOpen />} title="Read Along Audio" desc="Words light up like magic while the story is read out loud!" bg="bg-yellow-300" border="border-white" text="text-yellow-900" shadow="shadow-[0_12px_0_#ca8a04]" />
                        <FunCard icon={<FaGamepad />} title="Interactive Pages" desc="Tap the screen to find hidden animations and funny sounds!" bg="bg-pink-400" border="border-white" text="text-white" shadow="shadow-[0_12px_0_#be185d]" />
                        <FunCard icon={<GiCrystalBall />} title="Smart Learning" desc="The stories grow with your child's reading level automatically." bg="bg-sky-400" border="border-white" text="text-white" shadow="shadow-[0_12px_0_#0284c7]" />
                        <FunCard icon={<FaStar />} title="Win Treasures!" desc="Collect stars, earn cool badges, and unlock new outfits!" bg="bg-purple-400" border="border-white" text="text-white" shadow="shadow-[0_12px_0_#7e22ce]" />
                    </div>
                </div>
            </section>

            {/* ========================================= */}
            {/* FINAL CTA BOX */}
            {/* ========================================= */}
            <section className="relative py-24 md:py-40 px-4 md:px-6 bg-emerald-400 overflow-hidden">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 4px, transparent 4px)', backgroundSize: '40px 40px' }}></div>

                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto bg-white rounded-[50px] md:rounded-[80px] border-[8px] md:border-[12px] border-white shadow-[0_15px_0_rgba(0,0,0,0.15)] md:shadow-[0_25px_0_rgba(0,0,0,0.15)] p-10 md:p-24 text-center z-10"
                >
                    <div className="text-6xl md:text-8xl animate-bounce mb-6"><GiPartyPopper className="text-pink-400 mx-auto" /></div>
                    
                    <h2 className="text-4xl md:text-7xl font-black text-sky-500 tracking-tight leading-tight">
                        Ready For Your First <br className="hidden md:block"/> Adventure?
                    </h2>
                    
                    <p className="mt-8 md:mt-10 text-xl md:text-3xl text-slate-500 font-bold leading-relaxed max-w-3xl mx-auto">
                        Ask your parents to help you set up an account and start reading today!
                    </p>

                    <motion.div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-6">
                        <Link href={route('register')} className="inline-flex items-center justify-center w-full md:w-auto bg-yellow-400 text-yellow-900 text-2xl md:text-3xl px-10 md:px-14 py-6 md:py-8 rounded-full font-black shadow-[0_10px_0_#ca8a04] hover:translate-y-1 hover:shadow-[0_6px_0_#ca8a04] active:translate-y-3 active:shadow-none transition-all tracking-wide border-[4px] border-white">
                            <FaMagic className="mr-4 text-pink-500" /> Create Account
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ========================================= */}
            {/* CHUNKY FOOTER */}
            {/* ========================================= */}
            <footer className="relative bg-sky-500 py-16 md:py-24 px-6 rounded-t-[50px] md:rounded-t-[80px] border-t-[8px] md:border-t-[12px] border-white mt-[-40px] z-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
                    
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 bg-white w-max px-6 py-3 rounded-full border-4 border-sky-400 shadow-[0_6px_0_#38bdf8] mb-6">
                            <GiFairyWand className="text-3xl text-pink-400" />
                            <h2 className="text-3xl md:text-4xl font-black text-sky-500 tracking-tight">
                                MagicBooks<span className="text-yellow-400">.io</span>
                            </h2>
                        </div>
                        <p className="text-sky-100 text-xl md:text-2xl leading-relaxed max-w-md font-bold">
                            Turning screen time into reading time, one magical story at a time!
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-2xl md:text-3xl tracking-wide mb-6">Explore</h4>
                        <ul className="space-y-4 md:space-y-5 text-sky-100 text-xl font-bold">
                            <li className="hover:text-yellow-300 hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2"><FaStar className="text-sm"/> Stories</li>
                            <li className="hover:text-yellow-300 hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2"><FaStar className="text-sm"/> Games</li>
                            <li className="hover:text-yellow-300 hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2"><FaStar className="text-sm"/> Printables</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-2xl md:text-3xl tracking-wide mb-6">Grown-Ups</h4>
                        <ul className="space-y-4 md:space-y-5 text-sky-100 text-xl font-bold">
                            <li className="hover:text-yellow-300 hover:translate-x-2 transition-transform cursor-pointer">Help Center</li>
                            <li className="hover:text-yellow-300 hover:translate-x-2 transition-transform cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-yellow-300 hover:translate-x-2 transition-transform cursor-pointer">Safety Guidelines</li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-16 md:mt-20 pt-10 border-t-8 border-sky-400 border-dashed flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-sky-100 text-xl font-bold text-center md:text-left">
                        © {new Date().getFullYear()} MagicBooks.io. Made with 💖 and ✨.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollToTop}
                        className="flex items-center justify-center gap-3 bg-white text-sky-500 px-8 py-4 md:py-5 rounded-full font-black shadow-[0_8px_0_#bae6fd] hover:translate-y-1 hover:shadow-[0_4px_0_#bae6fd] active:translate-y-3 active:shadow-none transition-all tracking-wide text-xl w-full md:w-auto border-4 border-sky-200"
                    >
                        <FaCloud className="text-2xl" />
                        <span>Back To Top</span>
                    </motion.button>
                </div>
            </footer>
        </div>
    );
}

// =========================================
// FEATURED BOOK CARD (NEW COMPONENT)
// =========================================
function BookCard({ title, color, shadow, icon, delay, featured }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", bounce: 0.5, delay }}
            whileHover={{ y: -15, rotate: featured ? 0 : 2 }}
            className={`relative ${color} border-[6px] md:border-[8px] border-white rounded-[30px] md:rounded-[40px] p-8 pb-12 ${shadow} cursor-pointer group`}
        >
            {featured && (
                <div className="absolute -top-6 -right-6 bg-yellow-400 text-yellow-900 font-black px-4 py-2 rounded-full border-4 border-white shadow-md transform rotate-12 z-10 text-sm">
                    MOST POPULAR!
                </div>
            )}
            
            {/* Book Spine Simulation */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-black/10 rounded-l-[24px] md:rounded-l-[32px]"></div>

            <div className="bg-white/30 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 text-5xl md:text-6xl text-white group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>

            <h3 className="text-2xl md:text-4xl font-black text-white text-center leading-tight drop-shadow-sm">
                {title}
            </h3>

            <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 bg-white text-slate-700 font-black px-6 py-3 rounded-full border-4 border-slate-200 shadow-md group-hover:bg-yellow-400 group-hover:text-yellow-900 group-hover:border-white transition-colors">
                Read Now
            </div>
        </motion.div>
    );
}

// =========================================
// 3D BOUNCY FEATURE CARD
// =========================================
function FunCard({ icon, title, desc, bg, border, text, shadow }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ['10deg', '-10deg']), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ['-10deg', '10deg']), { stiffness: 200, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="perspective-[1200px]"
        >
            <motion.div
                whileHover={{ scale: 1.03 }}
                className={`${bg} ${border} border-[6px] md:border-[8px] rounded-[40px] md:rounded-[50px] p-8 md:p-12 ${shadow} relative overflow-hidden group cursor-pointer bg-opacity-95 backdrop-blur-sm`}
            >
                {/* 3D Content Container */}
                <div style={{ transform: 'translateZ(50px)' }}>
                    <div className="bg-white/30 w-20 h-20 md:w-24 md:h-24 rounded-[20px] md:rounded-[25px] flex items-center justify-center mb-6 md:mb-8 text-4xl md:text-6xl text-white group-hover:rotate-12 transition-transform duration-300">
                        {icon}
                    </div>
                    
                    <h3 className={`text-3xl md:text-5xl font-black ${text} drop-shadow-sm leading-tight tracking-tight`}>
                        {title}
                    </h3>
                    
                    <p className={`mt-4 md:mt-6 text-xl md:text-2xl font-bold ${text} opacity-90 leading-relaxed`}>
                        {desc}
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 md:w-40 h-32 md:w-40 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out" />
                <div className="absolute -bottom-6 -left-6 w-20 md:w-24 h-20 md:h-24 bg-white/20 rounded-full" />
            </motion.div>
        </motion.div>
    );
}