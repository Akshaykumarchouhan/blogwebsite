"use client";

import { motion } from "framer-motion";
import { PostCard } from "@/components/blog/PostCard";
import { Flame } from "lucide-react";

export function Trending() {
    const trendingPosts = [
        { title: "The Next Decade of Frontend Engineering", category: "Technology" },
        { title: "Stop Using margin-top: Why Layouts Break", category: "Design" },
        { title: "A Complete Guide to Next.js 14 App Router", category: "Tutorial" },
    ];

    return (
        <section className="py-16 md:py-24 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="flex items-center gap-3 mb-12">
                    <Flame className="w-8 h-8 text-[var(--warning)]" />
                    <h2 className="text-3xl md:text-4xl font-display italic font-semibold text-[var(--text-primary)]">
                        Trending This Week
                    </h2>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 md:grid md:grid-cols-3 md:mx-0 md:px-0 md:pb-0 gap-6">
                    {trendingPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                            className="snap-center shrink-0 w-[85vw] sm:w-[320px] md:w-auto relative"
                        >
                            {/* Large background number */}
                            <div className="absolute -top-10 -left-4 text-8xl font-display font-black text-[var(--text-primary)] opacity-5 select-none pointer-events-none z-0">
                                0{index + 1}
                            </div>

                            <div className="relative z-10 h-full p-4 rounded-[var(--radius-xl)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
                                <PostCard
                                    variant="compact"
                                    className="h-full border-none shadow-none hover:bg-transparent"
                                    post={post}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
