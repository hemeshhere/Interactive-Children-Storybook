import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

import {
    FaStar,
    FaRocket,
    FaEnvelope,
    FaLock,
    FaBookOpen,
} from 'react-icons/fa';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => reset('password');
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-100 flex items-center justify-center p-6 relative overflow-hidden font-['Fredoka',sans-serif]">

            <Head title="Log in - MagicBooks.io" />

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
                        className="absolute text-yellow-300 text-xl"
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

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="w-full max-w-md relative z-10 bg-white rounded-[40px] border-[6px] border-white shadow-[0_12px_0_rgba(0,0,0,0.1)] p-8 md:p-10"
            >

                {/* Logo + Heading */}
                <div className="text-center mb-8">

                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: -2 }}
                            className="inline-block"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <FaBookOpen className="text-sky-500 text-4xl" />

                                <h1 className="text-5xl font-black text-sky-500 drop-shadow-sm">
                                    MagicBooks
                                    <span className="text-yellow-400">.io</span>
                                </h1>
                            </div>
                        </motion.div>
                    </Link>

                    <div className="mt-4 flex items-center justify-center gap-3">

                        <div className="w-8 h-1 rounded-full bg-pink-300" />

                        <p className="text-slate-500 font-black text-lg md:text-xl flex items-center gap-2">
                            <FaStar className="text-yellow-400" />
                            Read. Play. Learn!
                            <FaStar className="text-yellow-400" />
                        </p>

                        <div className="w-8 h-1 rounded-full bg-pink-300" />
                    </div>

                    <p className="text-slate-400 font-bold mt-3 text-sm md:text-base">
                        Tiny stories for big imaginations
                    </p>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="mb-4 text-center text-green-500 font-bold">
                        {status}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="block font-black text-slate-700 mb-2 text-lg">
                            Email
                        </label>

                        <div className="relative">
                            <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400 text-lg" />

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full bg-sky-50 border-[4px] border-sky-200 text-slate-800 pl-14 pr-5 py-4 rounded-2xl font-bold focus:outline-none focus:border-sky-400 focus:bg-white transition-colors"
                                required
                            />
                        </div>

                        {errors.email && (
                            <p className="text-pink-500 font-bold mt-2">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-black text-slate-700 mb-2 text-lg">
                            Password
                        </label>

                        <div className="relative">
                            <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400 text-lg" />

                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full bg-sky-50 border-[4px] border-sky-200 text-slate-800 pl-14 pr-5 py-4 rounded-2xl font-bold focus:outline-none focus:border-sky-400 focus:bg-white transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-5 h-5 rounded border-sky-300 text-sky-500 focus:ring-sky-400"
                        />

                        <span className="font-bold text-slate-600">
                            Remember me
                        </span>
                    </div>

                    {/* Forgot Password */}
                    {canResetPassword && (
                        <div className="text-right">
                            <Link
                                href={route('password.request')}
                                className="text-pink-500 font-bold hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    )}

                    {/* Login Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={processing}
                        className="w-full bg-yellow-400 text-yellow-900 font-black text-2xl py-4 rounded-full border-b-[6px] border-yellow-600 hover:border-b-[2px] hover:translate-y-1 transition-all flex items-center justify-center gap-3"
                    >
                        <FaRocket />
                        Start Reading
                    </motion.button>
                </form>

                {/* Footer */}
                <p className="text-center text-slate-500 font-bold mt-8">
                    New here?{' '}
                    <Link
                        href={route('register')}
                        className="text-pink-500 hover:underline"
                    >
                        Create Account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}