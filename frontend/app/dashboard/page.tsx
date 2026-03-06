"use client";

import { motion } from "framer-motion";
import { Eye, Heart, MessageSquare, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

function StatCard({ title, value, change, icon: Icon, trend }: { title: string, value: string, change: string, icon: any, trend: 'up' | 'down' }) {
    return (
        <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow relative overflow-hidden group">
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-[var(--accent-glow)] rounded-full blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity" />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{title}</p>
                    <h3 className="text-3xl font-display font-semibold text-[var(--text-primary)]">{value}</h3>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-default)]">
                    <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
            </div>

            <div className="flex items-center gap-2 relative z-10">
                <span className={`flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md ${trend === 'up' ? "text-[var(--success)] bg-[var(--success-subtle)]" : "text-[var(--error)] bg-[var(--error-subtle)]"}`}>
                    {trend === 'up' ? '↑' : '↓'} {change}
                </span>
                <span className="text-xs text-[var(--text-tertiary)]">vs last month</span>
            </div>
        </div>
    );
}

export default function DashboardOverview() {
    const recentPosts = [
        { title: "Building a Design System in Figma", status: "Published", date: "Oct 24, 2026", views: "1.2k", likes: 342, comments: 28 },
        { title: "The Future of Serverless Computing", status: "Published", date: "Oct 18, 2026", views: "850", likes: 195, comments: 14 },
        { title: "My Workflow for Next.js Projects", status: "Draft", date: "Oct 26, 2026", views: "-", likes: "-", comments: "-" },
    ];

    return (
        <div className="p-6 lg:p-10 max-w-6xl mx-auto">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-1">Dashboard Overview</h1>
                    <p className="text-[var(--text-secondary)]">Welcome back, Jane. Here's what's happening with your content.</p>
                </div>
                <Link href="/dashboard/write">
                    <Button className="rounded-full shadow-[var(--shadow-md)]">
                        <Plus className="w-4 h-4 mr-2" /> New Post
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
                <StatCard title="Total Views" value="48.2k" change="12.5%" icon={Eye} trend="up" />
                <StatCard title="Followers" value="3,142" change="4.1%" icon={TrendingUp} trend="up" />
                <StatCard title="Total Likes" value="8,401" change="2.4%" icon={Heart} trend="down" />
                <StatCard title="Comments" value="432" change="18.2%" icon={MessageSquare} trend="up" />
            </motion.div>

            {/* Recent Posts Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">Recent Posts</h2>
                    <Link href="/dashboard/posts" className="text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors">
                        View all
                    </Link>
                </div>

                <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider bg-[var(--bg-secondary)]">
                        <div className="col-span-6 sm:col-span-5">Title</div>
                        <div className="hidden sm:block sm:col-span-2 text-center text-[var(--text-muted)]">Status</div>
                        <div className="col-span-3 sm:col-span-2 text-right sm:text-center text-[var(--text-muted)]">Date</div>
                        <div className="hidden lg:block lg:col-span-3">Performance</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-[var(--border-subtle)]">
                        {recentPosts.map((post, i) => (
                            <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer group">
                                <div className="col-span-6 sm:col-span-5 pr-4">
                                    <p className="font-medium text-[var(--text-primary)] text-sm mb-1 truncate group-hover:text-[var(--accent-primary)] transition-colors">{post.title}</p>
                                    {/* Mobile status indicator */}
                                    <span className={`sm:hidden text-xs rounded-full px-2 py-0.5 font-medium ${post.status === 'Published' ? 'bg-[var(--success-subtle)] text-[var(--success)]' : 'bg-[var(--warning-subtle)] text-[var(--warning)]'}`}>
                                        {post.status}
                                    </span>
                                </div>

                                <div className="hidden sm:flex sm:col-span-2 items-center justify-center">
                                    <span className={`text-xs rounded-full px-2.5 py-1 font-medium ${post.status === 'Published' ? 'bg-[var(--success-subtle)] text-[var(--success)] shadow-[0_0_10px_rgba(52,211,153,0.1)]' : 'bg-[var(--warning-subtle)] text-[var(--warning)]'}`}>
                                        {post.status}
                                    </span>
                                </div>

                                <div className="col-span-3 sm:col-span-2 text-right sm:text-center text-sm text-[var(--text-secondary)]">
                                    {post.date}
                                </div>

                                <div className="hidden lg:flex lg:col-span-3 items-center justify-end gap-6 text-sm text-[var(--text-secondary)]">
                                    <div className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-[var(--text-muted)]" /> {post.views}</div>
                                    <div className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-[var(--text-muted)]" /> {post.likes}</div>
                                    <div className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-[var(--text-muted)]" /> {post.comments}</div>
                                </div>

                                {/* Actions mobile */}
                                <div className="col-span-3 lg:hidden flex justify-end">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                                        <span className="sr-only">Options</span>
                                        <span className="leading-none text-xl mb-1">...</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
