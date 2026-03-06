import * as React from "react";
import { cn } from "@/lib/utils";

interface TagBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tag: string;
}

export function TagBadge({ tag, className, ...props }: TagBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-3 py-1 rounded-[var(--radius-full)] bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-xs)] text-[var(--text-tertiary)] transition-all duration-150 cursor-pointer",
                "hover:bg-[var(--accent-subtle)] hover:border-[var(--border-focus)] hover:text-[var(--accent-primary)]",
                className
            )}
            {...props}
        >
            <span className="opacity-50 mr-0.5 font-mono">#</span>
            {tag}
        </span>
    );
}
