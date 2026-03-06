"use client";

import { motion } from "framer-motion";
import { PostCard } from "@/components/blog/PostCard";

export function FeaturedPost() {
    return (
        <section className="py-16 md:py-24 container mx-auto px-4 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <PostCard variant="featured" />
            </motion.div>
        </section>
    );
}
