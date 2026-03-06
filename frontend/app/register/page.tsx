"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Lock, Mail, User, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Simple password strength calculation
    const strength = Math.min(
        100,
        (password.length > 7 ? 25 : 0) +
        (/[A-Z]/.test(password) ? 25 : 0) +
        (/[0-9]/.test(password) ? 25 : 0) +
        (/[^A-Za-z0-9]/.test(password) ? 25 : 0)
    );

    const strengthColor =
        strength <= 25 ? "bg-[var(--error)]" :
            strength <= 50 ? "bg-[var(--warning)]" :
                strength <= 75 ? "bg-[#60a5fa]" :
                    "bg-[var(--success)]";

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate register API
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
                    className="w-full max-w-md mx-auto pt-8" // Added pt-8 to keep away from logo on small screens
                >
                    <h1 className="text-4xl font-display font-semibold text-[var(--text-primary)] mb-2">Create an account</h1>
                    <p className="text-[var(--text-secondary)] mb-8">
                        Join thousands of writers and developers on Syntax.
                    </p>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <Input
                            type="text"
                            floatingLabel="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            leftIcon={<User className="w-4 h-4" />}
                            required
                        />

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

                            {/* Password Strength Indicator */}
                            <div className="pt-1 px-1">
                                <div className="flex justify-between items-center mb-1 text-[10px] text-[var(--text-tertiary)] uppercase font-semibold tracking-wider">
                                    <span>Password Strength</span>
                                    <span>{strength === 100 ? "Strong" : strength > 50 ? "Good" : strength > 0 ? "Weak" : ""}</span>
                                </div>
                                <div className="h-1.5 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden flex gap-1">
                                    <motion.div
                                        className={`h-full ${strengthColor}`}
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${strength}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-12 mt-6 text-base" isLoading={loading} disabled={password.length > 0 && strength < 25}>
                            Create Account <ArrowRight className="ml-2 w-4 h-4" />
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
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-[var(--accent-primary)] hover:underline transition-all">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right side: Visual (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 bg-[var(--bg-secondary)] relative overflow-hidden items-center justify-center border-l border-[var(--border-subtle)]">

                {/* Abstract background */}
                <div className="absolute inset-0"
                    style={{ backgroundImage: "linear-gradient(45deg, var(--bg-primary) 25%, transparent 25%, transparent 75%, var(--bg-primary) 75%, var(--bg-primary)), linear-gradient(45deg, var(--bg-primary) 25%, transparent 25%, transparent 75%, var(--bg-primary) 75%, var(--bg-primary))", backgroundSize: "60px 60px", backgroundPosition: "0 0, 30px 30px", opacity: 0.1 }}
                />

                {/* Intersecting Glowing orbs */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], x: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-1/4 top-1/4 w-[350px] h-[350px] bg-[var(--accent-primary)] rounded-full blur-[100px] pointer-events-none mix-blend-screen"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute right-1/4 bottom-1/4 w-[300px] h-[300px] bg-[#34d399] rounded-full blur-[100px] pointer-events-none mix-blend-screen"
                />

                {/* Centered Graphic/Message */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative z-10 w-[420px]"
                >
                    <h2 className="text-4xl font-display font-black text-white mix-blend-overlay mb-6">
                        Write. <br /> Publish. <br /> <span className="text-[var(--accent-primary)]">Scale.</span>
                    </h2>
                    <div className="h-2 w-16 bg-[var(--accent-primary)] rounded-full mb-8" />

                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-16 w-full bg-[var(--bg-elevated)]/60 backdrop-blur border border-[rgba(255,255,255,0.05)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] opacity-80" />
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
