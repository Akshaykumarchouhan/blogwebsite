"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2 } from "lucide-react";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
        }, 1500);
    };

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--accent-subtle)] to-[var(--bg-secondary)] opacity-50" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-semibold text-[var(--text-primary)] mb-4">
                            Join the inner circle
                        </h2>
                        <p className="text-lg text-[var(--text-secondary)]">
                            Get the best articles and insights delivered straight to your inbox every Sunday.
                        </p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[var(--bg-elevated)] p-6 rounded-[var(--radius-lg)] border border-[var(--success)] shadow-[var(--shadow-glow)] flex flex-col items-center"
                                style={{ '--shadow-glow': '0 0 20px rgba(52,211,153,0.2)' } as any}
                            >
                                <CheckCircle2 className="w-12 h-12 text-[var(--success)] mb-4" />
                                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">You're in! 🎉</h3>
                                <p className="text-[var(--text-secondary)]">Thank you for subscribing to our newsletter.</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                onSubmit={handleSubmit}
                                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                            >
                                <div className="flex-1 relative">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        leftIcon={<Mail className="w-4 h-4" />}
                                        required
                                        disabled={status === "loading"}
                                        className="h-12 bg-[var(--bg-elevated)]"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    isLoading={status === "loading"}
                                    className="w-full sm:w-auto h-12"
                                >
                                    Subscribe
                                </Button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {status !== "success" && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-xs text-[var(--text-tertiary)]"
                        >
                            No spam. Unsubscribe anytime.
                        </motion.p>
                    )}
                </div>
            </div>
        </section>
    );
}
