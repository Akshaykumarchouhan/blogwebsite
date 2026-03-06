"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PenTool, FileText, Settings, Activity, Users, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";

const NAV_ITEMS = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Drafts", href: "/dashboard/drafts", icon: PenTool },
    { name: "Published", href: "/dashboard/published", icon: FileText },
    { name: "Analytics", href: "/dashboard/analytics", icon: Activity },
    { name: "Followers", href: "/dashboard/followers", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)] h-full flex flex-col pt-6 pb-8 shrink-0 hidden md:flex">

            <div className="px-6 mb-8 flex items-center gap-3">
                <Avatar fallback="JD" size="md" className="ring-2 ring-[var(--accent-subtle)]" />
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-[var(--text-primary)] truncate">Jane Doe</h3>
                    <p className="text-xs text-[var(--text-secondary)] truncate">Creator Account</p>
                </div>
            </div>

            <div className="px-4 mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] pl-6">
                Menu
            </div>

            <nav className="flex-1 flex flex-col gap-1 px-3">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-200 group relative",
                                isActive
                                    ? "bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-semibold"
                                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[var(--accent-primary)] rounded-r-full" />
                            )}
                            <item.icon className={cn("w-4 h-4", isActive ? "text-[var(--accent-primary)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto px-3 border-t border-[var(--border-subtle)] pt-4">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium text-[var(--error)] hover:bg-[var(--bg-tertiary)] transition-colors">
                    <LogOut className="w-4 h-4" />
                    Log out
                </button>
            </div>
        </aside>
    );
}
