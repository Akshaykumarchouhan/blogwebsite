"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Terminal } from "lucide-react";

export function Hero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent<HTMLDivElement>) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Staggered animation settings
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } },
    };

    return (
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-gradient-hero">
            {/* Decorative Background noise */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
            />

            {/* Abstract circles */}
            <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-[var(--accent-glow)] rounded-full blur-[100px] opacity-60 pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-64 h-64 bg-[rgba(52,211,153,0.1)] rounded-full blur-[80px] opacity-40 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 md:px-6 h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

                {/* Left Content */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="lg:w-[55%] flex flex-col space-y-6 lg:space-y-8 max-w-2xl"
                >
                    <motion.div variants={item}>
                        <span className="inline-block tracking-[0.15em] text-[var(--accent-secondary)] uppercase text-xs sm:text-sm font-semibold mb-2">
                            ✦ Welcome to Syntax
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={item}
                        className="text-5xl sm:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] font-body"
                    >
                        Where Ideas <span className="font-display italic text-gradient pr-2">Find Their</span> Voice
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl"
                    >
                        Discover essays, tutorials, and insights from world-class engineers and designers shaping the future of the web.
                    </motion.p>

                    <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Button size="lg" className="w-full sm:w-auto text-base">Start Reading</Button>
                        <Button variant="ghost" size="lg" className="w-full sm:w-auto text-base border border-[var(--border-default)]">Write a Post</Button>
                    </motion.div>

                    <motion.div variants={item} className="pt-8 sm:pt-12 text-xs sm:text-sm text-[var(--text-tertiary)] font-medium tracking-wide">
                        <span className="text-[var(--text-primary)]">12K+</span> Articles <span className="mx-2 md:mx-4 opacity-50">•</span>
                        <span className="text-[var(--text-primary)]">4K+</span> Authors <span className="mx-2 md:mx-4 opacity-50">•</span>
                        <span className="text-[var(--text-primary)]">50K+</span> Readers
                    </motion.div>
                </motion.div>

                {/* Right Visual (Desktop stack) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="hidden lg:block lg:w-[45%] relative h-[560px]"
                    onMouseMove={handleMouseMove}
                >
                    {/* Main big glowing orb behind stack */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.7, 0.5]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[var(--gradient-glow)] blur-[60px] rounded-full z-0"
                    />

                    <div className="relative w-full h-full z-10 perspective-[1000px] flex items-center justify-center">

                        {/* Card 3 (Back) */}
                        <motion.div
                            style={{
                                x: useMotionTemplate`${mouseX}px / 30`,
                                y: useMotionTemplate`${mouseY}px / 30`,
                            }}
                            className="absolute w-[320px] h-[400px] rounded-[var(--radius-2xl)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-md)] overflow-hidden scale-90 -translate-y-8 -translate-x-12 rotate-[-4deg] opacity-60"
                        >
                            <div className="h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                        </motion.div>

                        {/* Card 2 (Middle) */}
                        <motion.div
                            style={{
                                x: useMotionTemplate`${mouseX}px / 20`,
                                y: useMotionTemplate`${mouseY}px / 20`,
                            }}
                            className="absolute w-[320px] h-[400px] rounded-[var(--radius-2xl)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-lg)] overflow-hidden scale-95 -translate-y-4 translate-x-12 rotate-[4deg] opacity-80"
                        >
                            <div className="h-40 bg-gradient-to-br from-rose-500/20 to-orange-500/20" />
                        </motion.div>

                        {/* Card 1 (Front View Dummy) */}
                        <motion.div
                            style={{
                                x: useMotionTemplate`${mouseX}px / 10`,
                                y: useMotionTemplate`${mouseY}px / 10`,
                            }}
                            className="absolute w-[340px] h-[440px] rounded-[var(--radius-2xl)] bg-[var(--gradient-card)] border border-[var(--border-default)] shadow-[var(--shadow-xl)] overflow-hidden z-20 flex flex-col transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
                        >
                            <div className="relative h-48 bg-[var(--bg-tertiary)] overflow-hidden flex items-center justify-center">
                                {/* Dummy abstract image */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-primary)] to-[var(--accent-subtle)] opacity-50" />
                                <Terminal className="w-16 h-16 text-[var(--text-muted)] opacity-30" />
                                <div className="absolute bottom-4 left-4">
                                    <CategoryBadge category="Architecture" />
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="font-display italic text-2xl font-semibold mb-3 leading-tight line-clamp-3 text-[var(--text-primary)]">
                                    The Elegant Architecture of Modern Serverless Web Applications
                                </h3>
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                                    <div className="flex items-center gap-2">
                                        <Avatar fallback="SD" size="sm" />
                                        <span className="text-sm font-medium text-[var(--text-secondary)]">Sarah Drasner</span>
                                    </div>
                                    <span className="text-xs text-[var(--text-tertiary)]">8 min read</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
