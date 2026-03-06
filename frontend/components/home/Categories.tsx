"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, PenTool, Code, MonitorSpeaker, Cpu, Layout, FileJson, Search } from "lucide-react";

export function Categories() {
    const categories = [
        { name: "Engineering", count: 124, icon: Code, color: "#7c6af7" },
        { name: "Design", count: 86, icon: PenTool, color: "#f472b6" },
        { name: "Product", count: 54, icon: Layout, color: "#34d399" },
        { name: "Marketing", count: 32, icon: MonitorSpeaker, color: "#fbbf24" },
        { name: "AI/ML", count: 91, icon: Cpu, color: "#60a5fa" },
        { name: "Web Dev", count: 215, icon: FileJson, color: "#fb923c" },
        { name: "SEO", count: 28, icon: Search, color: "#a78bfa" },
        { name: "Career", count: 45, icon: Compass, color: "#2dd4bf" },
    ];

    return (
        <section className="py-16 md:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
            <div className="container mx-auto px-4 md:px-6">

                <h2 className="text-3xl md:text-4xl font-display font-semibold text-[var(--text-primary)] mb-12 text-center">
                    Explore by Topic
                </h2>

                {/* Mobile: Horizontal Scroll, Desktop: Grid */}
                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 md:grid md:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.05 }}
                            className="snap-center shrink-0 w-[60vw] sm:w-[240px] md:w-auto mr-4 md:mr-0"
                        >
                            <Link
                                href={`/categories/${cat.name.toLowerCase()}`}
                                className="group flex flex-col items-center justify-center p-8 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--border-default)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
                            >
                                {/* Background Gradient Hover Overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(to bottom right, ${cat.color}, transparent)` }}
                                />

                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-500"
                                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                                >
                                    <cat.icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{cat.name}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">{cat.count} articles</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
