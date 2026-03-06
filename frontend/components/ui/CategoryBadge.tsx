import * as React from "react";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    category: string;
}

const CATEGORY_COLORS = ["#7c6af7", "#f472b6", "#34d399", "#fbbf24", "#60a5fa", "#fb923c", "#a78bfa", "#2dd4bf"];

export function CategoryBadge({ category, className, ...props }: CategoryBadgeProps) {
    // Hash string to pick a consistent color
    const hash = Array.from(category).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = CATEGORY_COLORS[hash % CATEGORY_COLORS.length];

    return (
        <div
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[var(--radius-full)] text-[var(--text-xs)] font-medium tracking-[0.05em] uppercase transition-colors hover:bg-opacity-20",
                className
            )}
            style={{
                backgroundColor: `${color}1F`, // 12% opacity hex approximation (`1F` is ~12%)
                color: `${color}E6`,           // 90% opacity
            }}
            {...props}
        >
            <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: color }}
                aria-hidden="true"
            />
            {category}
        </div>
    );
}
