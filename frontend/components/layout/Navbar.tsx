"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sun, Moon, Bell, Menu, X, Terminal } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/Dropdown";
import { SearchModal } from "@/components/ui/SearchModal";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/blog" },
    { name: "Categories", href: "/categories" },
    { name: "Authors", href: "/authors" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    // Fake auth state for UI demo
    const isAuthenticated = false;

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${scrolled
                    ? "bg-[rgba(10,10,15,0.80)] backdrop-blur-[20px] saturate-[180%] border-b border-[var(--border-subtle)]"
                    : "bg-transparent"
                    } ${theme === 'light' && scrolled ? "bg-[rgba(255,255,255,0.85)]" : ""}`}
            >
                <div className="container mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group relative z-50">
                        <Terminal className="h-6 w-6 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
                        <span className="font-display italic text-xl md:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                            Syntax
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative font-body text-sm font-medium transition-colors hover:text-[var(--text-primary)] py-2 ${isActive ? "text-[var(--accent-primary)]" : "text-[var(--text-secondary)]"
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent-primary)]"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    {/* Hover underline effect handled by CSS pseudo in global or inline: */}
                                    {!isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--text-primary)] scale-x-0 origin-left transition-transform duration-200 ease-out group-hover:scale-x-100" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-4 relative z-50">

                        {/* Search Toggle */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors focus:outline-none"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors focus:outline-none hidden sm:block relative overflow-hidden group"
                        >
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            {/* Ripple effect could be added here */}
                        </button>

                        {/* Notification Bell (Auth only) */}
                        {isAuthenticated && (
                            <Dropdown
                                align="right"
                                trigger={
                                    <button className="relative p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors focus:outline-none mr-2 hidden sm:block">
                                        <Bell className="h-5 w-5" />
                                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--error)] animate-pulse" />
                                    </button>
                                }
                            >
                                <div className="p-4 w-72 max-h-96 overflow-y-auto">
                                    <h3 className="font-semibold text-sm mb-2 text-[var(--text-primary)]">Notifications</h3>
                                    <DropdownSeparator />
                                    <div className="py-8 text-center text-[var(--text-muted)] text-sm">
                                        You're all caught up!
                                    </div>
                                </div>
                            </Dropdown>
                        )}

                        {/* Auth / Profile */}
                        <div className="hidden md:flex items-center border-l border-[var(--border-subtle)] pl-4 ml-2">
                            {isAuthenticated ? (
                                <Dropdown
                                    align="right"
                                    trigger={
                                        <button className="focus:outline-none group">
                                            <Avatar fallback="JD" showRing className="group-hover:ring-offset-[var(--bg-elevated)]" />
                                        </button>
                                    }
                                >
                                    <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
                                        <p className="text-sm font-medium text-[var(--text-primary)]">Jane Doe</p>
                                        <p className="text-xs text-[var(--text-muted)] truncate">jane@example.com</p>
                                    </div>
                                    <DropdownItem onClick={() => console.log('Dashboard')}>Dashboard</DropdownItem>
                                    <DropdownItem onClick={() => console.log('Write')}>Write a Post</DropdownItem>
                                    <DropdownItem onClick={() => console.log('Settings')}>Settings</DropdownItem>
                                    <DropdownSeparator />
                                    <DropdownItem danger onClick={() => console.log('Log out')}>Log out</DropdownItem>
                                </Dropdown>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                        Log in
                                    </Link>
                                    <Button size="sm" variant="primary">Sign up</Button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-[var(--text-primary)] focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-30 bg-[var(--bg-primary)] pt-20 px-6 pb-6 flex flex-col md:hidden"
                        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E')" }}
                    >
                        <nav className="flex flex-col gap-6 mt-8 flex-1">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.06 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-3xl font-display font-medium text-[var(--text-primary)] block"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="border-t border-[var(--border-subtle)] pt-6 flex flex-col gap-4"
                        >
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar fallback="JD" />
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">Jane Doe</p>
                                            <p className="text-sm text-[var(--text-secondary)]">@janedoe</p>
                                        </div>
                                    </div>
                                    <Button variant="secondary" className="w-full justify-start">Dashboard</Button>
                                    <Button variant="destructive" className="w-full justify-start">Log out</Button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="secondary" className="w-full">Log in</Button>
                                    <Button variant="primary" className="w-full">Sign up</Button>
                                </div>
                            )}

                            <div className="mt-4 flex justify-between items-center text-[var(--text-secondary)]">
                                <span className="text-sm">Switch Theme</span>
                                <button
                                    onClick={toggleTheme}
                                    className="p-3 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] focus:outline-none"
                                >
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Search Modal */}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
