"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: "left" | "right" | "center";
    className?: string;
}

export function Dropdown({ trigger, children, align = "right", className }: DropdownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Handle escape
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        }
        if (isOpen) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);


    const aligns = {
        left: "left-0",
        right: "right-0",
        center: "left-1/2 -translate-x-1/2",
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "absolute z-50 mt-2 w-56 origin-top rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-[var(--shadow-xl)] backdrop-blur-xl focus:outline-none overflow-hidden",
                            aligns[align],
                            className
                        )}
                        style={{ transformOrigin: align === "right" ? "top right" : align === "left" ? "top left" : "top center" }}
                        onClick={() => setIsOpen(false)} // Close on item click by default
                    >
                        <div className="py-1">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function DropdownItem({
    children,
    onClick,
    className,
    active = false,
    danger = false
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    active?: boolean;
    danger?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex w-full items-center px-4 h-9 text-sm transition-colors font-body",
                active
                    ? "bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-medium"
                    : danger
                        ? "text-[var(--error)] hover:bg-[var(--error-subtle)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]",
                className
            )}
        >
            {children}
        </button>
    );
}

export function DropdownSeparator() {
    return <div className="my-1 h-px bg-[var(--border-subtle)]" />;
}
