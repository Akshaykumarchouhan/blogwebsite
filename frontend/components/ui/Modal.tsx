"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "fullscreen";
}

export function Modal({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    footer,
    size = "md",
}: ModalProps) {

    // Close on Escape key
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Prevent background scrolling
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const sizes = {
        sm: "max-w-[440px]",
        md: "max-w-[560px]",
        lg: "max-w-[720px]",
        fullscreen: "max-w-[100vw] h-[100dvh] rounded-none m-0", // No margin, full screen
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 cursor-default">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-[8px]"
                    />

                    {/* Modal Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={cn(
                            "relative flex w-full flex-col overflow-hidden rounded-[var(--radius-xl)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-xl)]",
                            sizes[size]
                        )}
                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
                    >
                        {/* Header */}
                        {(title || subtitle) && (
                            <div className="flex flex-col space-y-1.5 p-6 pb-4 border-b border-[var(--border-subtle)]">
                                {title && <h2 className="text-xl font-semibold font-body text-[var(--text-primary)] tracking-tight">{title}</h2>}
                                {subtitle && <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>}

                                <button
                                    onClick={onClose}
                                    className="absolute right-4 top-4 rounded-full p-2 text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none"
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                        )}

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6 max-h-[70vh]">
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-[var(--border-subtle)] p-6 pt-4 bg-[var(--bg-secondary)]">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
