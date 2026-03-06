export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            <section className="text-center py-20 px-4">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                    Welcome to the <span className="text-primary">Blog</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Insights, thoughts, and stories from our expert authors. Building the future one article at a time.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity">
                        Read Latest Posts
                    </button>
                    <button className="bg-muted text-foreground px-6 py-3 rounded-md font-medium border border-border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        Subscribe Now
                    </button>
                </div>
            </section>

            {/* Placeholder for trending / featured grid */}
            <section className="mt-16">
                <h2 className="text-3xl font-bold mb-8 border-b border-border pb-2">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="border border-border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow bg-background text-foreground">
                            <div className="h-48 bg-muted w-full animate-pulse"></div>
                            <div className="p-6 flex-1 flex flex-col">
                                <span className="text-sm text-primary font-semibold mb-2 tracking-wide uppercase">Technology</span>
                                <h3 className="text-xl font-bold mb-3 line-clamp-2">How to Build a Modern Architecture with Next.js and Express</h3>
                                <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                                    Discover the best practices for connecting a robust backend with a dynamic server-rendered frontend in 2026. Custom APIs, JWT auth, and more.
                                </p>
                                <div className="flex items-center mt-4">
                                    <div className="w-8 h-8 rounded-full bg-muted mr-3"></div>
                                    <div className="text-sm">
                                        <p className="font-medium text-foreground">Author Name</p>
                                        <p className="text-muted-foreground">Mar 6, 2026 • 5 min read</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
