"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "destructive" | "link";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant = "primary", size = "md", isLoading, children, disabled, ...props },
        ref
    ) => {

        const baseStyles = "inline-flex items-center justify-center rounded-[var(--radius-md)] font-body transition-all duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            primary: "bg-gradient-accent text-white font-semibold hover:brightness-110 hover:shadow-[var(--shadow-glow)] active:scale-[0.97]",
            secondary: "bg-[var(--bg-tertiary)] border border-[var(--border-default)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] text-[var(--text-primary)]",
            ghost: "bg-transparent hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)]",
            destructive: "bg-[var(--error)] text-white hover:brightness-110",
            link: "text-[var(--accent-primary)] underline-offset-4 hover:underline",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2 text-sm",
            lg: "h-12 px-8 text-base",
            icon: "h-10 w-10",
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className={cn(isLoading && "opacity-60")}>{children}</span>
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
