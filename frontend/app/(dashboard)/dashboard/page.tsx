'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
    const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0, followersCount: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app we would fetch the user's stats from our API
        // Setting up dummy data for preview
        setTimeout(() => {
            setStats({
                totalPosts: 12,
                totalViews: 8430,
                followersCount: 154,
            });
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-border pb-4">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Link
                    href="/create-post"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90"
                >
                    Write New Post
                </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-pulse">
                    <div className="h-28 bg-muted rounded-lg border border-border"></div>
                    <div className="h-28 bg-muted rounded-lg border border-border"></div>
                    <div className="h-28 bg-muted rounded-lg border border-border"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                        <h3 className="text-muted-foreground font-medium mb-1">Total Posts</h3>
                        <p className="text-3xl font-bold">{stats.totalPosts}</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                        <h3 className="text-muted-foreground font-medium mb-1">Total Views</h3>
                        <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                        <h3 className="text-muted-foreground font-medium mb-1">Followers</h3>
                        <p className="text-3xl font-bold">{stats.followersCount}</p>
                    </div>
                </div>
            )}

            <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-bold">Your Recent Posts</h2>
                </div>

                {loading ? (
                    <div className="p-6 space-y-4 animate-pulse">
                        <div className="h-10 bg-muted rounded w-full"></div>
                        <div className="h-10 bg-muted rounded w-full"></div>
                        <div className="h-10 bg-muted rounded w-full"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted text-muted-foreground text-sm uppercase tracking-wider">
                                    <th className="p-4 font-medium">Title</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium">Views</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-border">
                                <tr className="hover:bg-muted/50 transition-colors">
                                    <td className="p-4 font-medium">How to Build a Modern Architecture</td>
                                    <td className="p-4"><span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full text-xs font-semibold">Published</span></td>
                                    <td className="p-4 text-muted-foreground">Mar 6, 2026</td>
                                    <td className="p-4">1,240</td>
                                    <td className="p-4 text-right space-x-3">
                                        <button className="text-blue-500 hover:underline">Edit</button>
                                        <button className="text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-muted/50 transition-colors">
                                    <td className="p-4 font-medium">The Future of AI Coding Assistants</td>
                                    <td className="p-4"><span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-semibold">Draft</span></td>
                                    <td className="p-4 text-muted-foreground">Mar 5, 2026</td>
                                    <td className="p-4">-</td>
                                    <td className="p-4 text-right space-x-3">
                                        <button className="text-blue-500 hover:underline">Edit</button>
                                        <button className="text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
