import Link from 'next/link';

export default function BlogListingPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 border-b border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Our Blog</h1>
                    <p className="text-muted-foreground text-lg">Detailed insights and best practices</p>
                </div>

                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">All</button>
                    <button className="px-4 py-2 rounded-full border border-border hover:bg-muted text-sm font-medium">Technology</button>
                    <button className="px-4 py-2 rounded-full border border-border hover:bg-muted text-sm font-medium">Lifestyle</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <Link href={`/blog/sample-post-${i}`} key={i} className="group flex flex-col border border-border rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300">
                        <div className="h-48 bg-muted relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/10 group-hover:scale-105 transition-transform duration-500"></div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Category</span>
                            <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                The Architect's Guide to Building Modern Web Applications
                            </h2>
                            <p className="text-muted-foreground line-clamp-3 mb-4 flex-1 text-sm">
                                Learn how to combine Next.js, Express, and MongoDB into a seamless and highly performant architecture.
                            </p>
                            <div className="flex items-center mt-4 pt-4 border-t border-border">
                                <div className="w-8 h-8 rounded-full bg-muted mr-3"></div>
                                <div className="text-sm">
                                    <p className="font-medium">Jane Doe</p>
                                    <p className="text-muted-foreground text-xs">Mar 6, 2026 • 8 min read</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-border rounded-md opacity-50 cursor-not-allowed">Previous</button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">1</button>
                    <button className="px-4 py-2 border border-border hover:bg-muted rounded-md">2</button>
                    <button className="px-4 py-2 border border-border hover:bg-muted rounded-md">3</button>
                    <button className="px-4 py-2 border border-border hover:bg-muted rounded-md">Next</button>
                </div>
            </div>
        </div>
    );
}
