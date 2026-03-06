export default function Footer() {
    return (
        <footer className="border-t border-border bg-muted/50 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-xl font-bold text-primary mb-4">Blog.io</h2>
                        <p className="text-muted-foreground max-w-sm mb-6">
                            A modern platform for developers and enthusiasts to share their thoughts, insights, and stories.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/blog" className="hover:text-primary transition-colors">All Posts</a></li>
                            <li><a href="/categories" className="hover:text-primary transition-colors">Categories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
                    &copy; {new Date().getFullYear()} Blog.io. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
