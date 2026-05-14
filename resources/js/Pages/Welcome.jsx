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
} from 'react-icons/fa';
import {
  FaFilm,
  FaVideo,
  FaPlay,
  FaClapperboard
} from "react-icons/fa6";
import {
    GiSpellBook,
    GiCastle,
    GiPartyPopper,
    GiCrystalBall,
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
    const cloudX = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const balloonY = useTransform(scrollYProgress, [0, 1], ['0px', '-600px']);
    const rainbowRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '15deg']);

    // =========================================
    // SCROLL TO TOP
    // =========================================
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const stars = [...Array(isMobile ? 15 : 35)];

    return (
        <div className="relative overflow-hidden bg-[#7dd3fc] font-['Fredoka',sans-serif] text-slate-800 selection:bg-pink-400 selection:text-white">
            <Head title="MagicBooks.io - Fun Stories for Kids!" />

            {/* ========================================= */}
            {/* SKY BACKGROUND */}
            {/* ========================================= */}
            <div className="fixed inset-0 -z-50 bg-gradient-to-b from-sky-300 via-cyan-200 to-emerald-200" />

            {/* SUN */}
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="fixed top-20 right-10 md:right-20 w-32 h-32 md:w-56 md:h-56 bg-yellow-300 rounded-full blur-[2px] shadow-[0_0_100px_rgba(253,224,71,1)] -z-20"
            />

            {/* RAINBOW */}
            <motion.div
                style={{ rotate: rainbowRotate }}
                className="fixed top-[5%] md:top-[10%] left-1/2 -translate-x-1/2 -z-30 opacity-60 pointer-events-none scale-75 md:scale-100"
            >
                <div className="w-[700px] h-[350px] rounded-t-full border-[40px] border-pink-400 border-b-0" />
                <div className="absolute top-8 left-8 w-[636px] h-[318px] rounded-t-full border-[35px] border-yellow-300 border-b-0" />
                <div className="absolute top-16 left-16 w-[572px] h-[286px] rounded-t-full border-[30px] border-green-400 border-b-0" />
            </motion.div>

            {/* FLOATING STARS */}
            {stars.map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="fixed text-yellow-200 text-xl md:text-2xl -z-10 pointer-events-none"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                >
                    <HiSparkles />
                </motion.div>
            ))}

            {/* CLOUDS */}
            <motion.div style={{ x: cloudX }} className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-32 left-4 md:left-10 w-40 md:w-52 h-16 md:h-24 bg-white rounded-full blur-[2px] opacity-90" />
                <div className="absolute top-44 left-20 md:left-32 w-32 md:w-44 h-12 md:h-20 bg-white rounded-full blur-[2px] opacity-80" />
                <div className="absolute top-52 right-4 md:right-10 w-56 md:w-72 h-20 md:h-28 bg-white rounded-full blur-[2px] opacity-90" />
            </motion.div>

            {/* ========================================= */}
            {/* BOUNCY NAVBAR */}
            {/* ========================================= */}
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
                <div className="bg-white border-[4px] md:border-[5px] border-white rounded-full px-4 md:px-6 py-3 md:py-4 shadow-[0_6px_0_rgba(0,0,0,0.12)] md:shadow-[0_8px_0_rgba(0,0,0,0.12)]">
                    <div className="flex items-center justify-between">
                        
                        {/* Logo */}
                        <motion.h1 onClick={scrollToTop} whileHover={{ scale: 1.05 }} className="text-2xl md:text-4xl font-black text-sky-500 cursor-pointer drop-shadow-sm">
                            MagicBooks<span className="text-yellow-400">.io</span>
                        </motion.h1>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#" className="font-bold text-sky-600 hover:text-pink-500 hover:-translate-y-1 transition-all text-lg">Stories</a>
                            <a href="https://kids.nationalgeographic.com/games/puzzles/" className="font-bold text-sky-600 hover:text-pink-500 hover:-translate-y-1 transition-all text-lg">Games</a>
                            
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="bg-sky-400 text-white px-8 py-3 rounded-full font-black shadow-[0_6px_0_#0284c7] hover:translate-y-1 hover:shadow-[0_2px_0_#0284c7] transition-all text-lg">
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center gap-6">
                                    <Link href={route('login')} className="font-black text-sky-600 hover:text-pink-500 text-lg transition-colors">
                                        Login
                                    </Link>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link href={route('register')} className="bg-yellow-400 text-yellow-900 px-8 py-3 rounded-full font-black shadow-[0_6px_0_#ca8a04] hover:translate-y-1 hover:shadow-[0_2px_0_#ca8a04] transition-all text-lg tracking-wide">
                                            Start Reading
                                        </Link>
                                    </motion.div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden bg-sky-100 p-2 rounded-full text-sky-600 font-black border-2 border-sky-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            className="absolute top-20 left-0 w-full bg-white border-[4px] border-sky-200 rounded-3xl p-4 shadow-xl flex flex-col gap-4 md:hidden"
                        >
                            <a href="#" className="font-black text-sky-600 text-xl text-center bg-sky-50 py-3 rounded-2xl">Stories</a>
                            <a href="https://kids.nationalgeographic.com/games/puzzles/" className="font-black text-sky-600 text-xl text-center bg-sky-50 py-3 rounded-2xl">Games</a>
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="bg-sky-400 text-white text-center py-3 rounded-2xl font-black shadow-[0_4px_0_#0284c7]">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="font-black text-pink-500 text-xl text-center bg-pink-50 py-3 rounded-2xl">Login</Link>
                                    <Link href={route('register')} className="bg-yellow-400 text-yellow-900 text-center py-4 rounded-2xl font-black shadow-[0_4px_0_#ca8a04]">Start Reading</Link>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ========================================= */}
            {/* HERO */}
            {/* ========================================= */}
            <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center px-4 md:px-6 pt-32 pb-20">
                
                {/* Parallax Balloon */}
                <motion.div
                    style={{ y: balloonY }} animate={{ rotate: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity }}
                    className="absolute left-[5%] top-[20%] hidden lg:flex flex-col items-center pointer-events-none"
                >
                    <div className="w-36 h-44 bg-red-400 rounded-t-full rounded-b-3xl border-[6px] border-red-500 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-10 w-full h-5 bg-yellow-300" />
                        <div className="absolute top-24 w-full h-5 bg-yellow-300" />
                    </div>
                    <div className="w-12 h-12 bg-amber-700 rounded-md border-4 border-amber-900 mt-2" />
                </motion.div>

                {/* Floating Book */}
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity }}
                    className="absolute right-[8%] top-[35%] hidden xl:block pointer-events-none"
                >
                    <div className="w-40 h-32 bg-pink-400 rounded-[30px] border-[6px] border-pink-500 shadow-2xl relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-[6px] bg-pink-600 -translate-x-1/2" />
                        <div className="absolute top-8 left-8 text-white text-4xl"><GiSpellBook /></div>
                    </div>
                </motion.div>

                <div className="relative z-20 max-w-5xl mx-auto text-center w-full mt-10 md:mt-0">
                    
                    {/* Cute Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', bounce: 0.6 }}
                        className="inline-flex items-center gap-2 md:gap-3 bg-white px-4 md:px-6 py-2 md:py-3 rounded-full border-[4px] md:border-[5px] border-white shadow-[0_4px_0_rgba(0,0,0,0.1)] md:shadow-[0_6px_0_rgba(0,0,0,0.12)] mb-6"
                    >
                        <span className="text-2xl md:text-3xl"><FaMagic className="text-pink-400" /></span>
                        <span className="font-black text-pink-500 text-sm md:text-lg tracking-wide">Magical Stories For Kids</span>
                    </motion.div>

                    {/* Hero Text */}
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.4, duration: 1 }}
                        className="text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] font-black text-white drop-shadow-[0_6px_0_rgba(0,0,0,0.12)] tracking-tight"
                    >
                        Open. <br className="md:hidden" />
                        Read. <br className="md:hidden" />
                        Explore!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                        className="mt-8 md:mt-10 text-lg md:text-3xl leading-relaxed text-sky-800 max-w-3xl mx-auto font-bold px-4"
                    >
                        Interactive stories, fun adventures, and magical worlds that make learning exciting for every child.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-10 md:mt-14 flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto"
                        >
                            <Link
                                href={route('register')}
                                className="flex items-center justify-center gap-3 bg-yellow-400 text-yellow-900 text-xl md:text-2xl px-8 md:px-12 py-4 md:py-6 rounded-full font-black shadow-[0_8px_0_#ca8a04] md:shadow-[0_10px_0_#ca8a04] hover:translate-y-2 hover:shadow-none transition-all w-full tracking-wide"
                            >
                                <FaRocket />
                                <span>Start Adventure</span>
                            </Link>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto bg-pink-400 text-white text-xl md:text-2xl px-8 md:px-12 py-4 md:py-6 rounded-full font-black shadow-[0_8px_0_#db2777] md:shadow-[0_10px_0_#db2777] hover:translate-y-2 hover:shadow-none transition-all tracking-wide"
                        >
                            <Link
                                href="#demo"
                                className="flex items-center justify-center gap-3"
                            >
                                <FaClapperboard />
                                <span>Watch Demo</span>
                            </Link>
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* ========================================= */}
            {/* FEATURES (The Hills) */}
            {/* ========================================= */}
            <section className="relative py-24 md:py-40 px-4 md:px-6">
                
                {/* CSS Drawn Hills */}
                <div className="absolute bottom-0 left-0 w-full h-full bg-emerald-400 rounded-t-[50px] md:rounded-t-[100px] -z-10 shadow-[inset_0_20px_0_rgba(255,255,255,0.2)]" />

                <div className="max-w-7xl mx-auto pt-10">
                    <div className="text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-black text-white drop-shadow-[0_5px_0_rgba(0,0,0,0.12)] tracking-tight px-2"
                        >
                            Why Kids Love MagicBooks
                        </motion.h2>
                    </div>

                    <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        <FunCard icon={<FaBookOpen />} title="Read Along Audio" desc="Words light up while the story is narrated!" bg="bg-yellow-300" border="border-yellow-400" />
                        <FunCard icon={<FaGamepad />} title="Interactive Stories" desc="Tap characters and discover hidden surprises!" bg="bg-pink-300" border="border-pink-400" />
                        <FunCard icon={<GiCrystalBall />} title="Smart Learning" desc="Stories adapt to your child’s reading level." bg="bg-sky-300" border="border-sky-400" />
                        <FunCard icon={<FaStar />} title="Adventure Rewards" desc="Unlock badges, stars, and magical treasures!" bg="bg-emerald-300" border="border-emerald-400" />
                    </div>
                </div>
            </section>

            {/* ========================================= */}
            {/* FINAL CTA BOX */}
            {/* ========================================= */}
            <section className="relative py-24 md:py-40 px-4 md:px-6 overflow-hidden bg-emerald-400">
                
                {/* Sparkles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`sparkle-${i}`}
                        className="absolute text-yellow-200 text-2xl md:text-3xl"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                    >
                        <FaMagic className="text-pink-400" />
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto bg-white rounded-[40px] md:rounded-[60px] border-[6px] md:border-[8px] border-white shadow-[0_10px_0_rgba(0,0,0,0.12)] md:shadow-[0_15px_0_rgba(0,0,0,0.12)] p-8 md:p-20 text-center"
                >
                    <div className="text-5xl md:text-8xl animate-bounce"><GiPartyPopper className="text-pink-400" /></div>
                    
                    <h2 className="mt-6 md:mt-8 text-4xl md:text-7xl font-black text-sky-500 tracking-tight">
                        Ready For The Adventure?
                    </h2>
                    
                    <p className="mt-6 md:mt-8 text-lg md:text-3xl text-slate-600 font-bold leading-relaxed max-w-2xl mx-auto">
                        Join thousands of kids exploring magical worlds through fun interactive stories.
                    </p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-10 md:mt-12">
                        <Link href={route('register')} className="inline-flex items-center justify-center w-full md:w-auto bg-yellow-400 text-yellow-900 text-xl md:text-3xl px-8 md:px-12 py-5 md:py-6 rounded-full font-black shadow-[0_8px_0_#ca8a04] md:shadow-[0_10px_0_#ca8a04] hover:translate-y-2 hover:shadow-none transition-all tracking-wide">
                            <FaMagic className="text-pink-400" /> Create Parent Account
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ========================================= */}
            {/* SOLID FOOTER */}
            {/* ========================================= */}
            <footer className="relative bg-sky-500 py-12 md:py-16 px-6 rounded-t-[40px] md:rounded-t-[60px] border-t-[6px] md:border-t-[8px] border-sky-400 mt-[-20px] z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-14">
                    
                    <div className="md:col-span-2">
                        <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-sm">
                            MagicBooks<span className="text-yellow-300">.io</span>
                        </h2>
                        <p className="mt-4 md:mt-6 text-sky-100 text-lg md:text-xl leading-relaxed max-w-md font-bold">
                            Turning reading into magical adventures for kids everywhere!
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-xl md:text-2xl tracking-wide">Explore</h4>
                        <ul className="mt-4 md:mt-6 space-y-3 md:space-y-4 text-sky-100 text-lg font-bold">
                            <li className="hover:text-yellow-300 hover:translate-x-1 transition-transform cursor-pointer">Stories</li>
                            <li className="hover:text-yellow-300 hover:translate-x-1 transition-transform cursor-pointer">Games</li>
                            <li className="hover:text-yellow-300 hover:translate-x-1 transition-transform cursor-pointer">Learning</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-xl md:text-2xl tracking-wide">Parents</h4>
                        <ul className="mt-4 md:mt-6 space-y-3 md:space-y-4 text-sky-100 text-lg font-bold">
                            <li className="hover:text-yellow-300 hover:translate-x-1 transition-transform cursor-pointer">Help Center</li>
                            <li className="hover:text-yellow-300 hover:translate-x-1 transition-transform cursor-pointer">Privacy</li>
                            <li className="hover:text-yellow-300 hover:translate-x-1 transition-transform cursor-pointer">Safety</li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t-4 border-sky-400 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sky-100 text-lg font-bold">
                        © {new Date().getFullYear()} MagicBooks.io
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollToTop}
                        className="flex items-center justify-center gap-3 bg-yellow-400 text-yellow-900 px-6 py-3 md:py-4 rounded-full font-black shadow-[0_6px_0_#ca8a04] hover:translate-y-1 hover:shadow-none transition-all tracking-wide w-full md:w-auto"
                    >
                        <FaCloud />
                        <span>Back To Top</span>
                    </motion.button>
                </div>
            </footer>
        </div>
    );
}

// =========================================
// 3D BOUNCY FEATURE CARD
// =========================================
function FunCard({ icon, title, desc, bg, border }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Softer spring for smoother card tilts
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ['8deg', '-8deg']), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ['-8deg', '8deg']), { stiffness: 150, damping: 20 });

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
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="perspective-[1000px]"
        >
            <motion.div
                whileHover={{ scale: 1.02, rotate: [-1, 1, -1] }}
                className={`${bg} ${border} border-[5px] md:border-[6px] rounded-[30px] md:rounded-[40px] p-8 md:p-10 shadow-[0_8px_0_rgba(0,0,0,0.12)] md:shadow-[0_12px_0_rgba(0,0,0,0.12)] relative overflow-hidden group cursor-pointer`}
            >
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl md:text-6xl text-white drop-shadow-md">
                    {icon}
                </motion.div>
                
                <h3 className="mt-4 md:mt-6 text-3xl md:text-4xl font-black text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.12)] leading-tight">
                    {title}
                </h3>
                
                <p className="mt-3 md:mt-4 text-lg md:text-xl font-bold text-white/90 leading-relaxed">
                    {desc}
                </p>

                {/* Decorative Bubble */}
                <div className="absolute -top-6 -right-6 w-20 md:w-24 h-20 md:h-24 bg-white/30 rounded-full group-hover:scale-110 transition-transform duration-500" />
            </motion.div>
        </motion.div>
    );
}