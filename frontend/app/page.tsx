import { Hero } from "@/components/home/Hero";
import { Trending } from "@/components/home/Trending";
import { FeaturedPost } from "@/components/home/FeaturedPost";
import { LatestPosts } from "@/components/home/LatestPosts";
import { Categories } from "@/components/home/Categories";
import { FeaturedAuthors } from "@/components/home/FeaturedAuthors";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <Trending />
            <FeaturedPost />
            <LatestPosts />
            <Categories />
            <FeaturedAuthors />
            <Newsletter />
        </div>
    );
}
