"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Lock, Mail, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login API
        setTimeout(() => {
            setLoading(false);
            window.location.href = "/dashboard";
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex">
            {/* Left side: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:px-24 xl:px-32 relative z-10">

                <Link href="/" className="absolute top-8 left-8 sm:left-12 lg:left-24 flex items-center gap-2 group">
                    <Terminal className="h-6 w-6 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
                    <span className="font-display italic text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                        Syntax
                    </span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md mx-auto"
                >
                    <h1 className="text-4xl font-display font-semibold text-[var(--text-primary)] mb-2">Welcome back</h1>
                    <p className="text-[var(--text-secondary)] mb-8">
                        Log in to your account to continue crafting.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <Input
                            type="email"
                            floatingLabel="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            leftIcon={<Mail className="w-4 h-4" />}
                            required
                        />

                        <div className="space-y-2">
                            <Input
                                type="password"
                                floatingLabel="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                leftIcon={<Lock className="w-4 h-4" />}
                                required
                            />
                            <div className="flex justify-end">
                                <Link href="/forgot-password" className="text-xs text-[var(--accent-primary)] hover:underline font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12 mt-4 text-base" isLoading={loading}>
                            Sign In <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </form>

                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[var(--border-subtle)]" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[var(--bg-primary)] text-[var(--text-muted)]">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <Button variant="secondary" className="w-full h-11 border border-[var(--border-default)]">
                            GitHub
                        </Button>
                        <Button variant="secondary" className="w-full h-11 border border-[var(--border-default)]">
                            Google
                        </Button>
                    </div>

                    <p className="mt-10 text-center text-sm text-[var(--text-secondary)]">
                        Don't have an account?{" "}
                        <Link href="/register" className="font-semibold text-[var(--accent-primary)] hover:underline transition-all">
                            Sign up
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right side: Visual (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 bg-[var(--bg-secondary)] relative overflow-hidden items-center justify-center border-l border-[var(--border-subtle)]">

                {/* Abstract geometric background */}
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(var(--border-strong) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
                />

                {/* Glowing orb */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3], rotate: [0, 90, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute right-1/4 top-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-[var(--accent-primary)] to-[#f472b6] rounded-full blur-[100px] pointer-events-none mix-blend-screen"
                />

                {/* Centered Quote/Artwork */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-10 max-w-lg p-12 bg-[var(--bg-primary)]/40 backdrop-blur-md rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] shadow-[var(--shadow-xl)]"
                >
                    <div className="w-12 h-12 bg-gradient-accent rounded-xl mb-6 flex items-center justify-center text-white">
                        <span className="font-display italic text-2xl font-bold">"</span>
                    </div>
                    <p className="text-2xl lg:text-3xl font-display font-medium leading-tight text-[var(--text-primary)] mb-6">
                        "Good design is obvious. Great design is transparent. The best code is the code you never have to write."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-default)]" />
                        <div>
                            <p className="font-semibold text-sm text-[var(--text-primary)]">Joe Gebbia</p>
                            <p className="text-xs text-[var(--text-secondary)]">Designer & Entrepreneur</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
