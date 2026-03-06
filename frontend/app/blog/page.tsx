"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List, Filter, ChevronDown } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/Button";

const CATEGORIES = ["All", "Technology", "Design", "Product", "Engineering", "Marketing"];

export default function BlogListingPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [activeCategory, setActiveCategory] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const dummyPosts = Array(9).fill(null);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-16">

            {/* Sticky Filter Bar */}
            <div className="sticky top-14 md:top-16 z-30 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
                <div className="container mx-auto px-4 md:px-6 py-4">

                    <div className="flex items-center justify-between">
                        {/* Desktop Categories */}
                        <div className="hidden md:flex items-center gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                                            ? "bg-[var(--accent-primary)] text-white"
                                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            className="md:hidden flex items-center gap-2 text-[var(--text-primary)] font-medium text-sm"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <Filter className="w-4 h-4" /> Filters
                            <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                        </button>

                        {/* Right Controls */}
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center text-sm text-[var(--text-secondary)] gap-2 border-r border-[var(--border-subtle)] pr-4">
                                <span>Sort by:</span>
                                <select className="bg-transparent text-[var(--text-primary)] font-medium focus:outline-none cursor-pointer">
                                    <option>Latest</option>
                                    <option>Popular</option>
                                    <option>Oldest</option>
                                </select>
                            </div>

                            {/* View Toggles */}
                            <div className="flex items-center bg-[var(--bg-tertiary)] rounded-md p-1 border border-[var(--border-subtle)]">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-1.5 rounded-sm transition-colors ${viewMode === "grid" ? "bg-[var(--bg-elevated)] text-[var(--accent-primary)] shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}
                                    aria-label="Grid view"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-1.5 rounded-sm transition-colors ${viewMode === "list" ? "bg-[var(--bg-elevated)] text-[var(--accent-primary)] shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}
                                    aria-label="List view"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Filter Dropdown */}
                    {isFilterOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="md:hidden mt-4 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap gap-2"
                        >
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                                            ? "bg-[var(--accent-primary)] text-white"
                                            : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>
                    )}

                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content (Posts) */}
                    <div className="lg:w-[70%]">
                        <div className="mb-8">
                            <h1 className="text-4xl lg:text-5xl font-display font-semibold text-[var(--text-primary)] mb-4">
                                {activeCategory === "All" ? "Explore All Posts" : `${activeCategory} Articles`}
                            </h1>
                            <p className="text-[var(--text-secondary)] text-lg">
                                Dive into the latest insights, tutorials, and thought leadership from our community of writers.
                            </p>
                        </div>

                        {/* Grid Mode */}
                        {viewMode === "grid" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                {dummyPosts.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <PostCard variant="default" className="h-full" />
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* List Mode */}
                        {viewMode === "list" && (
                            <div className="flex flex-col gap-6">
                                {dummyPosts.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <PostCard variant="horizontal" />
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Pagination / Load More */}
                        <div className="mt-16 text-center">
                            <Button variant="secondary" size="lg" className="px-12 rounded-full shadow-[var(--shadow-sm)]">
                                Load More Posts
                            </Button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block lg:w-[30%]">
                        <div className="sticky top-40 flex flex-col gap-10">

                            {/* Popular Tags */}
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] p-6">
                                <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                                    Trending Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {["React", "Next.js", "Serverless", "Tailwind", "Architecture", "Design Systems", "Web Performance"].map(tag => (
                                        <span key={tag} className="inline-block px-3 py-1 bg-[var(--bg-tertiary)] hover:bg-[var(--accent-subtle)] hover:text-[var(--accent-primary)] border border-[var(--border-subtle)] rounded-full text-xs text-[var(--text-secondary)] transition-colors cursor-pointer">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Popular Authors (Compact) */}
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] p-6">
                                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Popular Authors</h3>
                                <div className="flex flex-col gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center gap-3 group cursor-pointer">
                                            <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] overflow-hidden shrink-0 group-hover:ring-2 ring-[var(--accent-primary)] transition-all" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[var(--text-primary)] truncate group-hover:text-[var(--accent-primary)] transition-colors">Developer {i}</p>
                                                <p className="text-xs text-[var(--text-muted)] truncate">Software Engineer</p>
                                            </div>
                                            <button className="text-[var(--accent-primary)] text-xs font-medium hover:underline">
                                                Follow
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
