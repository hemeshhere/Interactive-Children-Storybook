import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthenticatedLayout({ user, header, children }) {
    const [mobileMenu, setMobileMenu] = useState(false);
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-sky-100 font-['Fredoka',sans-serif] text-slate-800 relative overflow-hidden selection:bg-pink-400 selection:text-white">
            
            {/* Background Clouds */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-10 left-10 w-40 h-16 bg-white rounded-full blur-[2px]" />
                <div className="absolute top-32 right-20 w-64 h-24 bg-white rounded-full blur-[2px]" />
            </div>

            {/* Bouncy Floating Navbar */}
            <nav className="relative z-50 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="bg-white border-[5px] border-white rounded-full px-6 py-3 shadow-[0_8px_0_rgba(0,0,0,0.05)] flex justify-between items-center">
                    <Link href="/" className="text-3xl font-black text-sky-500 hover:scale-105 transition-transform">
                        MagicBooks<span className="text-yellow-400">.io</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href={route('dashboard')} className={`font-black text-xl hover:text-pink-500 transition-colors ${url.startsWith('/dashboard') ? 'text-pink-500' : 'text-sky-400'}`}>
                            Dashboard
                        </Link>
                        <Link href={route('library')} className={`font-black text-xl hover:text-pink-500 transition-colors ${url.startsWith('/library') ? 'text-pink-500' : 'text-sky-400'}`}>
                            Library
                        </Link>
                        
                        {/* Parent Profile Pill */}
                        <div className="bg-sky-50 border-[3px] border-sky-200 px-5 py-2 rounded-full font-bold text-sky-700 flex items-center gap-3">
                            <span className="text-xl">👩‍👧‍👦</span> {user.name}
                        </div>
                        <Link href={route('logout')} method="post" as="button" className="font-bold text-slate-400 hover:text-red-500 transition-colors">Log Out</Link>
                    </div>

                    <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-sky-500 p-2"><span className="text-2xl font-black">☰</span></button>
                </div>

                <AnimatePresence>
                    {mobileMenu && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-24 left-4 right-4 bg-white border-[5px] border-sky-200 rounded-3xl p-4 shadow-xl z-50 flex flex-col gap-2 md:hidden">
                            <Link href={route('dashboard')} className="font-black text-sky-600 text-xl text-center bg-sky-50 py-3 rounded-2xl">Dashboard</Link>
                            <Link href={route('library')} className="font-black text-sky-600 text-xl text-center bg-sky-50 py-3 rounded-2xl">Library</Link>
                            <Link href={route('logout')} method="post" as="button" className="font-black text-pink-500 text-xl text-center bg-pink-50 py-3 rounded-2xl">Log Out</Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {header && <header className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">{header}</header>}
            <main className="relative z-10 pb-20">{children}</main>
        </div>
    );
}