import type { Metadata } from 'next';

import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
    title: 'Professional Blog Website',
    description: 'A modern, dynamic blog built with Next.js and Tailwind CSS',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased flex flex-col`}>
                <ThemeProvider>
                    <ToastProvider>
                        <Navbar />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                    </ToastProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
