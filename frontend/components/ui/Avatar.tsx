"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string | null;
    alt?: string;
    fallback?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    showRing?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, src, alt, fallback, size = "md", showRing, ...props }, ref) => {
        const [imgError, setImgError] = React.useState(false);

        const sizes = {
            "xs": "h-[20px] w-[20px] text-[10px]",
            "sm": "h-[28px] w-[28px] text-xs",
            "md": "h-[36px] w-[36px] text-sm",
            "lg": "h-[48px] w-[48px] text-base",
            "xl": "h-[64px] w-[64px] text-xl",
            "2xl": "h-[96px] w-[96px] text-3xl",
        };

        // Determine fallback color based on name length or generic
        const fallbackColors = [
            "bg-[#7c6af7]", "bg-[#f472b6]", "bg-[#34d399]",
            "bg-[#fbbf24]", "bg-[#60a5fa]", "bg-[#fb923c]"
        ];
        const colorIndex = fallback ? fallback.charCodeAt(0) % fallbackColors.length : 0;
        const fallbackBg = fallbackColors[colorIndex];

        const showImg = src && !imgError;

        return (
            <div
                ref={ref}
                className={cn(
                    "relative flex shrink-0 overflow-hidden rounded-[var(--radius-full)]",
                    sizes[size],
                    showRing && "ring-2 ring-[var(--accent-primary)] ring-offset-2 ring-offset-[var(--bg-primary)] hover:ring-opacity-80 transition-shadow",
                    className
                )}
                {...props}
            >
                {showImg ? (
                    <img
                        src={src}
                        alt={alt || "Avatar"}
                        className="aspect-square h-full w-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div
                        className={cn(
                            "flex h-full w-full items-center justify-center text-white font-medium tracking-wide uppercase",
                            fallbackBg
                        )}
                    >
                        {fallback ? fallback.slice(0, 2) : "?"}
                    </div>
                )}
            </div>
        );
    }
);
Avatar.displayName = "Avatar";

export { Avatar };
