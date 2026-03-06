"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Image as ImageIcon, LayoutTemplate, Settings, Eye, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function CreatePostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

    const handleSaveDraft = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">

            {/* Editor Top Bar */}
            <header className="sticky top-0 z-30 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] h-16 px-4 md:px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-6 w-px bg-[var(--border-subtle)]" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-[var(--text-primary)]">Draft Post</span>
                        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                            {isSaving ? (
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[var(--warning)] animate-pulse" /> Saving...</span>
                            ) : lastSaved ? (
                                <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[var(--success)]" /> Saved at {lastSaved}</span>
                            ) : (
                                <span>Not saved yet</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" onClick={handleSaveDraft} disabled={isSaving}>
                        Save Draft
                    </Button>
                    <Button variant="secondary" size="sm" className="hidden sm:flex" onClick={() => setActiveTab(activeTab === 'write' ? 'preview' : 'write')}>
                        {activeTab === 'write' ? <><Eye className="w-4 h-4 mr-2" /> Preview</> : <><PenTool className="w-4 h-4 mr-2" /> Write</>}
                    </Button>
                    <Button size="sm" variant="primary">
                        Publish
                    </Button>
                </div>
            </header>

            {/* Editor Canvas */}
            <main className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16">

                {activeTab === "write" ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {/* Cover Image Placeholder */}
                        <div className="w-full h-48 sm:h-64 border-2 border-dashed border-[var(--border-subtle)] rounded-[var(--radius-xl)] bg-[var(--bg-secondary)] flex flex-col items-center justify-center text-[var(--text-muted)] hover:border-[var(--border-focus)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all cursor-pointer group mb-10 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-primary)] to-[var(--bg-secondary)] opacity-50 group-hover:scale-105 transition-transform duration-500" />
                            <ImageIcon className="w-10 h-10 mb-3 text-[var(--border-strong)] group-hover:text-[var(--accent-primary)] transition-colors relative z-10" />
                            <span className="font-medium relative z-10">Add a cover image</span>
                            <span className="text-xs mt-1 opacity-70 relative z-10">Recommended size: 1600x840px</span>
                        </div>

                        {/* Title Input */}
                        <input
                            type="text"
                            placeholder="Post Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-transparent font-display font-medium text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none mb-8 tracking-tight"
                        />

                        {/* Toolbar Mini (simulated) */}
                        <div className="sticky top-20 z-20 flex items-center gap-1 p-1 bg-[var(--bg-elevated)]/80 backdrop-blur-md border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] mb-6 w-fit">
                            {['B', 'I', 'U'].map(format => (
                                <button key={format} className="w-8 h-8 rounded-md hover:bg-[var(--bg-tertiary)] flex items-center justify-center font-display font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    {format}
                                </button>
                            ))}
                            <div className="w-px h-5 bg-[var(--border-subtle)] mx-1" />
                            <button className="w-8 h-8 rounded-md hover:bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                <LayoutTemplate className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-md hover:bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                <Settings className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content Textarea */}
                        <Textarea
                            placeholder="Start writing your masterpiece... (Markdown supported)"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full min-h-[50vh] bg-transparent border-none text-lg text-[var(--text-secondary)] font-body leading-loose resize-none focus-visible:shadow-none p-0 placeholder-[var(--text-muted)]"
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="prose prose-lg dark:prose-invert max-w-none"
                    >
                        {/* Preview Mode */}
                        {title ? <h1 className="font-display text-5xl mb-12">{title}</h1> : <h1 className="font-display text-5xl mb-12 text-[var(--text-muted)]">Untitled Post</h1>}
                        {content ? (
                            <div className="whitespace-pre-wrap">{content}</div>
                        ) : (
                            <p className="text-[var(--text-muted)] italic">Nothing to preview yet.</p>
                        )}
                    </motion.div>
                )}
            </main>

        </div>
    );
}

// Just missing an import for PenTool that threw an error in preview so:
import { PenTool } from "lucide-react";
