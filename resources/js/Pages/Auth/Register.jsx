import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

import {
    FaStar,
    FaRocket,
    FaEnvelope,
    FaLock,
    FaBookOpen,
    FaUserAstronaut,
} from 'react-icons/fa';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => reset('password', 'password_confirmation');
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-100 flex items-center justify-center px-4 py-6 relative overflow-hidden font-['Fredoka',sans-serif]">

            <Head title="Create Account - MagicBooks.io" />

            {/* Clouds + Stars Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

                {/* Cloud 1 */}
                <motion.div
                    animate={{ x: [0, 30, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute top-20 left-10 w-40 h-16 bg-white rounded-full opacity-70"
                />

                {/* Cloud 2 */}
                <motion.div
                    animate={{ x: [0, -40, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-40 right-20 w-56 h-20 bg-white rounded-full opacity-60"
                />

                {/* Cloud 3 */}
                <motion.div
                    animate={{ x: [0, 25, 0] }}
                    transition={{ duration: 18, repeat: Infinity }}
                    className="absolute bottom-24 left-1/4 w-64 h-24 bg-white rounded-full opacity-50"
                />

                {/* Floating Stars */}
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-yellow-300 text-lg sm:text-xl"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2 + i,
                            repeat: Infinity,
                        }}
                    >
                        <FaStar />
                    </motion.div>
                ))}
            </div>

            {/* Register Card */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="w-full max-w-md relative z-10 bg-white rounded-[32px] border-[5px] border-white shadow-[0_10px_0_rgba(0,0,0,0.08)] p-5 sm:p-7 md:p-8"
            >

                {/* Logo + Heading */}
                <div className="text-center mb-6">

                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: -2 }}
                            className="inline-block"
                        >
                            <div className="flex items-center justify-center gap-2 sm:gap-3">
                                <FaBookOpen className="text-sky-500 text-3xl sm:text-4xl" />

                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-sky-500 drop-shadow-sm leading-none">
                                    MagicBooks
                                    <span className="text-yellow-400">.io</span>
                                </h1>
                            </div>
                        </motion.div>
                    </Link>

                    <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3">

                        <div className="w-6 sm:w-8 h-1 rounded-full bg-pink-300" />

                        <p className="text-slate-500 font-black text-sm sm:text-lg md:text-xl flex items-center gap-2 text-center">
                            <FaStar className="text-yellow-400" />
                            Read. Play. Learn!
                            <FaStar className="text-yellow-400" />
                        </p>

                        <div className="w-6 sm:w-8 h-1 rounded-full bg-pink-300" />
                    </div>

                    <p className="text-slate-400 font-bold mt-3 text-xs sm:text-sm md:text-base">
                        Tiny stories for big imaginations
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block font-black text-slate-700 mb-2 text-sm sm:text-base">
                            Full Name
                        </label>

                        <div className="relative">
                            <FaUserAstronaut className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 text-base sm:text-lg" />

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full bg-sky-50 border-[3px] border-sky-200 text-slate-800 pl-12 pr-4 py-3 rounded-2xl font-bold text-sm sm:text-base focus:outline-none focus:border-sky-400 focus:bg-white transition-colors"
                                required
                            />
                        </div>

                        {errors.name && (
                            <p className="text-pink-500 font-bold mt-2 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-black text-slate-700 mb-2 text-sm sm:text-base">
                            Email Address
                        </label>

                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 text-base sm:text-lg" />

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full bg-sky-50 border-[3px] border-sky-200 text-slate-800 pl-12 pr-4 py-3 rounded-2xl font-bold text-sm sm:text-base focus:outline-none focus:border-sky-400 focus:bg-white transition-colors"
                                required
                            />
                        </div>

                        {errors.email && (
                            <p className="text-pink-500 font-bold mt-2 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-black text-slate-700 mb-2 text-sm sm:text-base">
                            Password
                        </label>

                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 text-base sm:text-lg" />

                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full bg-sky-50 border-[3px] border-sky-200 text-slate-800 pl-12 pr-4 py-3 rounded-2xl font-bold text-sm sm:text-base focus:outline-none focus:border-sky-400 focus:bg-white transition-colors"
                                required
                            />
                        </div>

                        {errors.password && (
                            <p className="text-pink-500 font-bold mt-2 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block font-black text-slate-700 mb-2 text-sm sm:text-base">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 text-base sm:text-lg" />

                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value
                                    )
                                }
                                className="w-full bg-sky-50 border-[3px] border-sky-200 text-slate-800 pl-12 pr-4 py-3 rounded-2xl font-bold text-sm sm:text-base focus:outline-none focus:border-sky-400 focus:bg-white transition-colors"
                                required
                            />
                        </div>

                        {errors.password_confirmation && (
                            <p className="text-pink-500 font-bold mt-2 text-sm">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    {/* Register Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={processing}
                        className="w-full bg-yellow-400 text-yellow-900 font-black text-lg sm:text-xl py-3 sm:py-4 rounded-full border-b-[5px] border-yellow-600 hover:border-b-[2px] hover:translate-y-1 transition-all flex items-center justify-center gap-3"
                    >
                        <FaRocket />
                        Start Adventure
                    </motion.button>
                </form>

                {/* Footer */}
                <p className="text-center text-slate-500 font-bold mt-6 text-sm sm:text-base">
                    Already have an account?{' '}
                    <Link
                        href={route('login')}
                        className="text-pink-500 hover:underline"
                    >
                        Log In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}