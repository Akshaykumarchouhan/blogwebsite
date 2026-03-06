import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-default)] mt-auto pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1 border-r border-transparent md:border-[var(--border-subtle)] pr-8">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Terminal className="h-6 w-6 text-[var(--accent-primary)]" />
                            <span className="font-display italic text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                                Syntax
                            </span>
                        </Link>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                            A premium technical blogging platform designed for clarity, speed, and aesthetic excellence.
                        </p>
                        <div className="flex gap-4 text-[var(--text-muted)]">
                            {/* Dummy social icons */}
                            <div className="h-8 w-8 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors cursor-pointer" />
                            <div className="h-8 w-8 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors cursor-pointer" />
                            <div className="h-8 w-8 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors cursor-pointer" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-4">Platform</h4>
                        <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                            <li><Link href="/explore" className="hover:text-[var(--accent-primary)] transition-colors">Explore</Link></li>
                            <li><Link href="/authors" className="hover:text-[var(--accent-primary)] transition-colors">Authors</Link></li>
                            <li><Link href="/topics" className="hover:text-[var(--accent-primary)] transition-colors">Topics</Link></li>
                            <li><Link href="/pricing" className="hover:text-[var(--accent-primary)] transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                            <li><Link href="/docs" className="hover:text-[var(--accent-primary)] transition-colors">Documentation</Link></li>
                            <li><Link href="/api" className="hover:text-[var(--accent-primary)] transition-colors">API Reference</Link></li>
                            <li><Link href="/community" className="hover:text-[var(--accent-primary)] transition-colors">Community Form</Link></li>
                            <li><Link href="/help" className="hover:text-[var(--accent-primary)] transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                            <li><Link href="/about" className="hover:text-[var(--accent-primary)] transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-[var(--accent-primary)] transition-colors">Careers</Link></li>
                            <li><Link href="/privacy" className="hover:text-[var(--accent-primary)] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-[var(--accent-primary)] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between text-xs text-[var(--text-tertiary)] gap-4">
                    <p>© {new Date().getFullYear()} Syntax Blog Platform. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>Designed with precision</span>
                        <span>Built with Next.js</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
