"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";

export function LatestPosts() {
    const dummyPosts = Array(7).fill(null); // 7 posts for the grid

    return (
        <section className="py-16 md:py-24 bg-[var(--bg-primary)]">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-semibold text-[var(--text-primary)] mb-2">
                            Latest Posts
                        </h2>
                        <p className="text-[var(--text-secondary)]">Fresh insights hot off the press.</p>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"
                    >
                        View All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* 3-column grid where first item spans 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {dummyPosts.map((_, index) => {
                        const isFirst = index === 0;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: Math.min(index * 0.1, 0.5) }} // Cap delay
                                className={isFirst ? "md:col-span-2" : ""}
                            >
                                <PostCard
                                    variant={isFirst ? "featured" : "default"}
                                    className={isFirst ? "h-full min-h-[400px]" : "h-full"}
                                />
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
