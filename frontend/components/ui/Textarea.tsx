"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[120px] w-full rounded-[var(--radius-md)] border bg-[var(--bg-secondary)] px-3 py-2 text-base font-body text-[var(--text-primary)] transition-all duration-150 resize-y placeholder:text-[var(--text-muted)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    error
                        ? "border-[var(--error)] focus-visible:shadow-[0_0_0_3px_rgba(248,113,113,0.25)]"
                        : "border-[var(--border-default)] focus-visible:border-[var(--border-focus)] focus-visible:shadow-[0_0_0_3px_var(--accent-glow)]",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
