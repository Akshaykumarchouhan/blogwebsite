"use client";

import * as React from "react";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
}

interface ToastContextType {
    toast: (options: Omit<Toast, "id">) => void;
    dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback(({
        type = "info",
        title,
        description,
        duration = 5000
    }: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { id, type, title, description, duration };

        setToasts((prev) => [...prev, newToast]);

        if (duration > 0) {
            setTimeout(() => {
                dismiss(id);
            }, duration);
        }
    }, []);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast, dismiss }}>
            {children}
            <div className="fixed bottom-0 right-0 z-50 p-4 md:p-6 flex flex-col gap-2 pointer-events-none sm:bottom-0 sm:right-0 max-w-[100vw]">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};

// Internal component for rendering individual toasts
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {

    const icons = {
        success: <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />,
        error: <AlertCircle className="h-5 w-5 text-[var(--error)]" />,
        warning: <AlertTriangle className="h-5 w-5 text-[var(--warning)]" />,
        info: <Info className="h-5 w-5 text-[var(--info)]" />
    };

    const borders = {
        success: "border-l-[var(--success)]",
        error: "border-l-[var(--error)]",
        warning: "border-l-[var(--warning)]",
        info: "border-l-[var(--info)]"
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%", transition: { ease: "easeIn", duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`pointer-events-auto relative flex w-full max-w-sm sm:w-[360px] min-w-[280px] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-[var(--shadow-lg)] backdrop-blur-xl border-y border-r border-[var(--border-default)] border-l-[3px] ${borders[toast.type]}`}
        >
            <div className="flex items-start gap-4 p-4">
                <div className="shrink-0">{icons[toast.type]}</div>
                <div className="flex-1 space-y-1">
                    <p className="font-semibold font-body text-sm">{toast.title}</p>
                    {toast.description && (
                        <p className="text-sm text-[var(--text-secondary)]">{toast.description}</p>
                    )}
                </div>
                <button
                    onClick={onDismiss}
                    className="shrink-0 rounded-md p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors focus:outline-none"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Progress bar animation for the duration */}
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: (toast.duration || 5000) / 1000, ease: "linear" }}
                className="h-[2px] w-full origin-left bg-[var(--border-subtle)]"
            >
                <div className={`h-full w-full ${toast.type === 'success' ? 'bg-[var(--success)]' : toast.type === 'error' ? 'bg-[var(--error)]' : toast.type === 'warning' ? 'bg-[var(--warning)]' : 'bg-[var(--info)]'} opacity-50`} />
            </motion.div>
        </motion.div>
    );
}
