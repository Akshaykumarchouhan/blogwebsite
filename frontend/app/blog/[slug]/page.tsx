import Link from "next/link";
import { ArrowLeft, Share2, Heart, MessageSquare, Twitter, Linkedin, Copy } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { TagBadge } from "@/components/ui/TagBadge";
import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/blog/PostCard";

// Mock data
const POST = {
  title: "A Complete Guide to Next.js 14 App Router Architecture",
  excerpt: "Mastering the mental model of Server Components, Data Fetching, and caching in the modern React ecosystem.",
  content: `
    <h2>The Paradigm Shift</h2>
    <p>The introduction of React Server Components (RSC) fundamentally changes how we think about rendering web applications. Instead of sending large JavaScript bundles to the client, we can now render components on the server and only send the HTML and minimal necessary interactive JS.</p>
    
    <blockquote>
      "The best JavaScript framework is the one that sends the least JavaScript to the browser." — Unknown
    </blockquote>
    
    <p>When migrating to the App Router, the most common challenge developers face is understanding <em>where</em> code executes. The line between client and server is no longer dictated solely by API routes; it's declared at the component level.</p>
    
    <h3>Understanding Server Components</h3>
    <p>By default, all components in the App Router are Server Components. This means they cannot use hooks like <code>useState</code> or <code>useEffect</code>, and they cannot handle browser events like <code>onClick</code>.</p>
    
    <ul>
      <li><strong>Smaller Bundle Sizes:</strong> Server component code never hits the client.</li>
      <li><strong>Direct Backend Access:</strong> Query databases securely without API endpoints.</li>
      <li><strong>Automatic Code Splitting:</strong> Client components are split automatically.</li>
    </ul>

    <pre><code class="language-tsx">
// app/users/page.tsx
export default async function UsersPage() {
  // Direct DB call in a component!
  const users = await db.query('SELECT * FROM users');
  
  return (
    &lt;ul&gt;
      {users.map(user =&gt; (
        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
    </code></pre>

    <p>This structure drastically simplifies data fetching, creating a more robust and predictable mental model for engineers building at scale.</p>
  `,
  category: "Engineering",
  tags: ["react", "nextjs", "architecture", "performance"],
  author: {
    name: "Alex Rivera",
    role: "Frontend Architect",
    bio: "Building fast interfaces and writing about modern web technologies. Focus on React ecosystem.",
    avatar: "AR",
  },
  publishedAt: "Aug 12, 2026",
  readingTime: "10 min read",
  likes: 1240,
};

export default function SinglePostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16 md:pt-24 pb-24">

      {/* Article Header (Centered, Max Width) */}
      <header className="container mx-auto px-4 md:px-6 max-w-4xl text-center mb-12">
        <div className="mb-6 flex items-center justify-center gap-4 text-sm text-[var(--text-tertiary)]">
          <Link href="/blog" className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <span>&bull;</span>
          <span>{POST.publishedAt}</span>
          <span>&bull;</span>
          <span>⏱ {POST.readingTime}</span>
        </div>

        <div className="mb-8 flex justify-center">
          <CategoryBadge category={POST.category} />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[var(--text-primary)] leading-[1.15] mb-6 tracking-tight">
          {POST.title}
        </h1>

        <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto mb-10">
          {POST.excerpt}
        </p>

        <div className="flex items-center justify-center gap-4 pb-12 border-b border-[var(--border-subtle)]">
          <Avatar fallback={POST.author.avatar} size="md" />
          <div className="text-left">
            <p className="font-semibold text-[var(--text-primary)] leading-tight">{POST.author.name}</p>
            <p className="text-sm text-[var(--text-muted)]">@{POST.author.name.replace(' ', '').toLowerCase()}</p>
          </div>
          <Button variant="secondary" size="sm" className="ml-4 rounded-full h-8 text-xs px-4">Follow</Button>
        </div>
      </header>

      {/* Hero Image (Edge to edge mobile, rounded desktop) */}
      <div className="container mx-auto px-0 md:px-6 max-w-5xl mb-16 md:mb-20">
        <div className="w-full aspect-video md:aspect-[21/9] bg-[var(--bg-tertiary)] md:rounded-[var(--radius-2xl)] overflow-hidden relative border-y md:border-[var(--border-subtle)] group">
          {/* Dummy abstract hero */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1a24] via-[#2a2a3f] to-[#1e1e2d] flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 ease-out">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')] opacity-20" />
            <span className="text-white/10 font-display italic text-8xl md:text-9xl tracking-tighter">Syntax</span>
          </div>
        </div>
        <p className="text-center text-xs text-[var(--text-muted)] mt-3">Illustration by Midjourney AI for Syntax Blog</p>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* Sticky Sidebar (Left) */}
        <div className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-28 flex flex-col gap-8 text-sm">

            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-4 text-xs uppercase tracking-wider">Share</h4>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors"><Twitter className="w-4 h-4" /></button>
                <button className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors"><Linkedin className="w-4 h-4" /></button>
                <button className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors"><Copy className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="h-px bg-[var(--border-subtle)]" />

            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-4 text-xs uppercase tracking-wider">Table of Contents</h4>
              <ul className="space-y-3 text-[var(--text-secondary)] border-l-2 border-[var(--border-subtle)] pl-4">
                <li className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors -ml-[18px] pl-4 border-l-2 border-[var(--accent-primary)] font-medium text-[var(--text-primary)]">The Paradigm Shift</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors">Understanding Server Components</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors">Data Fetching Patterns</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors">Client Boundaries</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors">Caching Mechanisms</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Main Content (Prose) */}
        <article className="flex-1 max-w-[65ch] mx-auto w-full">

          {/* Custom Prose Styles targeting the raw HTML injected content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-display prose-headings:font-medium prose-headings:text-[var(--text-primary)] prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[var(--border-subtle)]
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-[var(--text-secondary)] prose-p:leading-[1.8] prose-p:mb-6 prose-p:font-body
                prose-a:text-[var(--accent-primary)] prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-[var(--accent-primary)] prose-blockquote:bg-[var(--accent-subtle)] prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:text-xl prose-blockquote:font-display prose-blockquote:-italic prose-blockquote:text-[var(--text-primary)] prose-blockquote:my-8
                prose-ul:text-[var(--text-secondary)] prose-ul:mb-6 prose-ul:list-disc prose-ul:pl-6
                prose-li:mb-2 prose-li:leading-relaxed
                prose-strong:text-[var(--text-primary)] prose-strong:font-semibold
                prose-code:text-[var(--text-primary)] prose-code:bg-[var(--bg-tertiary)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0d0d14] prose-pre:border prose-pre:border-[var(--border-subtle)] prose-pre:rounded-[var(--radius-lg)] prose-pre:p-4 prose-pre:shadow-[var(--shadow-md)] prose-pre:overflow-x-auto
                "
            dangerouslySetInnerHTML={{ __html: POST.content }}
          />

          {/* Tags Area */}
          <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-wrap gap-2">
            <span className="text-sm font-semibold text-[var(--text-primary)] mr-2 flex items-center">Tags:</span>
            {POST.tags.map(tag => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          {/* Engagement Bar (Mobile/Bottom) */}
          <div className="mt-12 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-[var(--radius-xl)] p-4 shadow-[var(--shadow-md)] flex items-center justify-between sticky bottom-6 z-20">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors group">
                <div className="p-2 rounded-full bg-[var(--bg-tertiary)] group-hover:bg-[var(--accent-subtle)] transition-colors">
                  <Heart className="w-5 h-5 group-hover:fill-[var(--accent-primary)]" />
                </div>
                <span className="font-medium text-sm">{POST.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group">
                <div className="p-2 rounded-full bg-[var(--bg-tertiary)] group-hover:bg-[var(--border-default)] transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm">42</span>
              </button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button className="p-2 text-[var(--text-secondary)] hover:text-[#1DA1F2] transition-colors"><Twitter className="w-5 h-5" /></button>
              <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"><Copy className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Author Bio Box */}
          <div className="mt-16 bg-[var(--gradient-card)] border border-[var(--border-default)] rounded-[var(--radius-2xl)] p-8 shadow-[var(--shadow-sm)]">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <Avatar fallback={POST.author.avatar} size="2xl" className="ring-4 ring-[var(--bg-tertiary)]" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{POST.author.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent-primary)] text-xs font-semibold">{POST.author.role}</span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                  {POST.author.bio}
                </p>
                <Button variant="secondary" size="sm" className="rounded-full px-6">View all posts</Button>
              </div>
            </div>
          </div>

        </article>
      </div>

      {/* Related Posts */}
      <div className="container mx-auto px-4 md:px-6 mt-24 pt-16 border-t border-[var(--border-subtle)]">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-[var(--text-primary)] mb-8 text-center md:text-left">
          More from {POST.category}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <PostCard variant="default" />
          <PostCard variant="default" className="hidden md:flex" />
          <PostCard variant="default" className="hidden md:flex" />
        </div>
      </div>

    </div>
  );
}
