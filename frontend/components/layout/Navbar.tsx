import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
                    <span>Blog.io</span>
                </Link>
                <div className="flex items-center space-x-6">
                    <Link href="/blog" className="text-foreground/80 hover:text-foreground transition-colors font-medium">Articles</Link>
                    <Link href="/search" className="text-foreground/80 hover:text-foreground transition-colors font-medium">Search</Link>

                    <div className="h-6 w-px bg-border mx-2"></div>

                    <Link href="/login" className="text-foreground/80 hover:text-primary transition-colors font-medium">Log in</Link>
                    <Link href="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity">
                        Sign up
                    </Link>
                </div>
            </div>
        </nav>
    );
}
