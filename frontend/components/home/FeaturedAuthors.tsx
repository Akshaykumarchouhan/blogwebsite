"use client";

import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

export function FeaturedAuthors() {
    const authors = [
        { name: "Jane Doe", role: "Frontend Architect", fallback: "JD", followers: "12.5k" },
        { name: "John Smith", role: "UI Engineer", fallback: "JS", followers: "8.2k" },
        { name: "Alice Johnson", role: "Product Designer", fallback: "AJ", followers: "34k" },
        { name: "Bob Wilson", role: "Backend Developer", fallback: "BW", followers: "5.1k" },
    ];

    return (
        <section className="py-16 md:py-24 bg-[var(--bg-primary)]">
            <div className="container mx-auto px-4 md:px-6">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-semibold text-[var(--text-primary)] mb-4">
                        Meet the Authors
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Learn directly from industry experts sharing their production experience.
                    </p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 md:grid md:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0">
                    {authors.map((author, index) => (
                        <motion.div
                            key={author.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                            className="snap-center shrink-0 w-[70vw] sm:w-[280px] md:w-auto mr-4 md:mr-0 group"
                        >
                            <div className="flex flex-col items-center p-8 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 hover:border-[var(--border-default)] transition-all duration-300">
                                <Avatar
                                    fallback={author.fallback}
                                    size="xl"
                                    className="mb-4 group-hover:ring-4 group-hover:ring-[var(--accent-subtle)] transition-all duration-300"
                                />
                                <h3 className="text-lg font-bold text-[var(--text-primary)]">{author.name}</h3>
                                <p className="text-sm font-medium text-[var(--accent-primary)] mb-2">{author.role}</p>
                                <p className="text-xs text-[var(--text-tertiary)] mb-6">{author.followers} Followers</p>
                                <Button variant="secondary" className="w-full rounded-full">Follow</Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
