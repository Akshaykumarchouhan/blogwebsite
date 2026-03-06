"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, X, Terminal, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";

export function SearchModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"articles" | "authors" | "tags">("articles");

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const recentSearches = ["React 19 RC", "Server Components", "Vercel AI SDK"];

    const dummyResults = [
        { type: "article", title: "Understanding React Server Components in Next.js App Router", category: "React" },
        { type: "article", title: "A Deep Dive into Node.js Worker Threads", category: "Backend" },
        { type: "author", name: "Sarah Drasner", role: "Frontend Architect" },
        { type: "tag", name: "react-query", count: 142 },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 px-4 sm:px-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm"
                    />

                    {/* Search Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] overflow-hidden flex flex-col max-h-[70vh]"
                    >
                        {/* Search Input Area */}
                        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center relative gap-3">
                            <SearchIcon className="w-5 h-5 text-[var(--text-muted)] shrink-0 ml-2" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search articles, authors, or tags..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent text-lg sm:text-xl font-body text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none min-w-0"
                            />

                            {query && (
                                <button onClick={() => setQuery("")} className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            )}

                            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)] font-mono shrink-0">
                                <span className="text-[12px]">ESC</span> to close
                            </div>
                        </div>

                        {/* Results / Suggestions Area */}
                        <div className="flex-1 overflow-y-auto p-2">

                            {!query ? (
                                <div className="p-4">
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">Recent Searches</h4>
                                    <div className="space-y-1">
                                        {recentSearches.map((s, i) => (
                                            <button key={i} onClick={() => setQuery(s)} className="w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-[var(--bg-tertiary)] group transition-colors text-left">
                                                <Clock className="w-4 h-4 text-[var(--text-muted)]" />
                                                <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{s}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {/* Tabs */}
                                    <div className="flex items-center gap-1 p-2 mb-2 border-b border-[var(--border-subtle)]">
                                        {(["articles", "authors", "tags"] as const).map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${activeTab === tab ? "bg-[var(--accent-subtle)] text-[var(--accent-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"}`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Dummy Results List */}
                                    <div className="p-2 space-y-1">
                                        {dummyResults.filter(r => r.type === activeTab || activeTab === "articles").map((item, i) => (
                                            <Link key={i} href="#" onClick={onClose} className="flex items-center justify-between p-3 rounded-[var(--radius-md)] hover:bg-[var(--bg-tertiary)] group transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-subtle)] group-hover:border-[var(--border-default)] transition-colors">
                                                        {item.type === 'article' ? <Terminal className="w-4 h-4 text-[var(--text-secondary)]" /> : item.type === 'author' ? <span className="w-4 h-4 flex items-center justify-center text-xs font-bold text-[var(--accent-primary)]">{item.name?.[0]}</span> : <span className="w-4 h-4 flex items-center justify-center font-mono text-[var(--text-secondary)]">#</span>}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                                                            {item.title || item.name}
                                                        </p>
                                                        <p className="text-xs text-[var(--text-muted)]">
                                                            {item.category || item.role || `${item.count} articles`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Branding */}
                        <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-center sm:text-right">
                            <span className="text-[10px] text-[var(--text-tertiary)] font-medium tracking-wide">
                                SEARCH POWERED BY <span className="text-[var(--text-primary)] italic font-display">Syntax</span>
                            </span>
                        </div>
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    );
}
