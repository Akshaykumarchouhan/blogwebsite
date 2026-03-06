"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { TagBadge } from "@/components/ui/TagBadge";
import { cn } from "@/lib/utils";

export interface PostCardProps {
    variant?: "default" | "featured" | "compact" | "horizontal";
    className?: string;
    // Dummy data props for layout testing
    post?: any;
}

export function PostCard({ variant = "default", className, post }: PostCardProps) {

    // Dummy post data wrapper
    const p = post || {
        slug: "example-post",
        title: "How To Build Scalable UI Components In React",
        excerpt: "Learn the architectural patterns behind building robust, accessible, and performant React components for enterprise applications.",
        category: "Engineering",
        tags: ["react", "ui", "architecture"],
        author: { name: "Alex Rivera", avatar: "AR" },
        publishedAt: "Aug 12, 2026",
        readingTime: "6 min read",
        likes: 342,
        imageUrl: null
    };

    if (variant === "featured") {
        return (
            <Link href={`/blog/${p.slug}`} className={cn("group relative flex w-full h-[480px] rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border-default)] shadow-[var(--shadow-lg)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--border-focus)]", className)}>
                {/* Background Image / Placeholder */}
                <div className="absolute inset-0 bg-[var(--bg-tertiary)] overflow-hidden">
                    {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-[var(--bg-secondary)] to-[var(--accent-subtle)] group-hover:scale-105 transition-transform duration-700 ease-out" />
                    )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.95)] via-[rgba(10,10,15,0.7)] to-transparent pointer-events-none" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[var(--accent-primary)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-[var(--radius-sm)]">Editor's Pick</span>
                        <CategoryBadge category={p.category} />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-medium text-white leading-tight mb-4 group-hover:text-[var(--accent-secondary)] transition-colors line-clamp-2">
                        {p.title}
                    </h2>

                    <div className="hidden md:flex gap-2 mb-6">
                        {p.tags?.slice(0, 3).map((tag: string) => (
                            <TagBadge key={tag} tag={tag} className="border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.7)]" />
                        ))}
                    </div>

                    <div className="flex justify-between items-center text-sm text-[rgba(255,255,255,0.7)] border-t border-[rgba(255,255,255,0.1)] pt-4 mt-2">
                        <div className="flex items-center gap-3">
                            <Avatar fallback={p.author.avatar} size="sm" />
                            <span className="font-semibold text-white">{p.author.name}</span>
                            <span className="hidden sm:inline">&bull; {p.publishedAt}</span>
                        </div>
                        <div className="flex gap-4">
                            <span>⏱ {p.readingTime}</span>
                            <span>♥ {p.likes}</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    if (variant === "compact") {
        return (
            <Link href={`/blog/${p.slug}`} className={cn("group flex items-center gap-4 rounded-[var(--radius-lg)] p-2 hover:bg-[var(--bg-tertiary)] transition-colors duration-200 border border-transparent hover:border-[var(--border-subtle)]", className)}>
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[var(--text-tertiary)] text-xs mb-1">
                        <span className="font-medium text-[var(--accent-primary)]">{p.category}</span>
                        <span>&bull;</span>
                        <span>{p.publishedAt}</span>
                    </div>
                    <h3 className="font-body font-semibold text-sm md:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                        {p.title}
                    </h3>
                </div>
                <div className="shrink-0 w-20 h-20 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-elevated)] group-hover:scale-110 transition-transform duration-500" />
                </div>
            </Link>
        );
    }

    if (variant === "horizontal") {
        return (
            <Link href={`/blog/${p.slug}`} className={cn("group flex flex-col sm:flex-row bg-[var(--gradient-card)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--border-default)]", className)}>
                <div className="w-full sm:w-2/5 md:w-1/3 h-48 sm:h-auto bg-[var(--bg-tertiary)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-primary)] to-[var(--accent-subtle)] opacity-50 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-3 left-3">
                        <CategoryBadge category={p.category} />
                    </div>
                </div>
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                    <div className="flex gap-2 text-[var(--text-tertiary)] text-xs mb-3">
                        <span>⏱ {p.readingTime}</span>
                        <span>&bull;</span>
                        <span>{p.publishedAt}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-medium mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {p.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-4">
                        {p.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2">
                        <Avatar fallback={p.author.avatar} size="xs" />
                        <span className="text-xs font-medium text-[var(--text-secondary)]">{p.author.name}</span>
                    </div>
                </div>
            </Link>
        );
    }

    // Default Variant
    return (
        <Link href={`/blog/${p.slug}`} className={cn("group flex flex-col h-full bg-[var(--gradient-card)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--border-default)]", className)}>
            <div className="w-full aspect-[16/9] bg-[var(--bg-tertiary)] relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-elevated)] group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-3 left-3">
                    <CategoryBadge category={p.category} />
                </div>
            </div>

            <div className="flex flex-col flex-1 p-5 sm:p-6">
                <div className="flex gap-2 text-[var(--text-tertiary)] text-xs mb-3">
                    <span>⏱ {p.readingTime}</span>
                    <span>&bull;</span>
                    <span>{p.publishedAt}</span>
                </div>

                <h3 className="text-xl font-display font-medium text-[var(--text-primary)] line-clamp-2 mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                    {p.title}
                </h3>

                <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-5 flex-1">
                    {p.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] mt-auto text-[var(--text-secondary)] text-sm">
                    <div className="flex items-center gap-2">
                        <Avatar fallback={p.author.avatar} size="xs" />
                        <span className="font-medium">{p.author.name}</span>
                    </div>
                    <span className="text-xs">♥ {p.likes}</span>
                </div>
            </div>
        </Link>
    );
}
