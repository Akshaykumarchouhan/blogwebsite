import { cn } from "@/lib/utils";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-[var(--bg-tertiary)] overflow-hidden relative",
                className
            )}
            {...props}
        >
            {/* Shimmer effect */}
            <div
                className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.06)] to-transparent"
            />
            {/* Light mode shimmer override handled via css cascade or we can just leave it as is if it blends well */}
        </div>
    );
}

// Add shimmer keyframe to global tailwind or styles
// But for inline, we can rely on standard animate-pulse mostly, or inject custom class.
// A simpler robust way for next.js is just relying on TW's animate-pulse.

function SkeletonText({ className, lines = 1 }: { className?: string; lines?: number }) {
    return (
        <div className={cn("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn("h-4 w-full", i === lines - 1 && lines > 1 ? "w-2/3" : "")}
                />
            ))}
        </div>
    );
}

function SkeletonAvatar({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
    const sizeMap = { sm: "h-7 w-7", md: "h-9 w-9", lg: "h-12 w-12" };
    return <Skeleton className={cn("rounded-full", sizeMap[size], className)} />;
}

export { Skeleton, SkeletonText, SkeletonAvatar };
