import Image from 'next/image';
import Link from 'next/link';

export default function SinglePostPage({ params }: { params: { slug: string } }) {
    // In a real app we would fetch the post using the slug
    const post = {
        title: 'The Architect\\'s Guide to Building Modern Web Applications',
    excerpt: 'Learn how to combine Next.js, Express, and MongoDB into a seamless and highly performant architecture.',
        content: "<p>Building modern web applications requires a robust architecture that scales. In 2026, the stack of choice for many teams is Next.js for the frontend and Express.js with MongoDB for the backend.</p><h2>Why Next.js?</h2><p>Next.js provides excellent developer experience with its App Router, built-in optimizations for images and fonts, and flexible rendering strategies (SSR, SSG, ISR).</p><h2>Express and MongoDB</h2><p>While Next.js has API routes, for complex applications a dedicated backend using Express offers better separation of concerns. MongoDB remains a flexible, fast document database perfect for unstructured content like blog posts and comments.</p>",
        author: {
            name: 'Jane Doe',
            avatar: 'https://picsum.photos/200',
            bio: 'Senior Software Engineer specializing in full-stack architecture.'
        },
        publishedAt: 'Mar 6, 2026',
        readingTime: '8 min read',
        category: 'Technology',
        tags: ['Architecture', 'Next.js', 'Express', 'MongoDB'],
        likes: 342,
        coverImage: 'https://picsum.photos/1200/600',
    };

    return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/blog" className="text-primary hover:underline text-sm font-medium mb-4 inline-block">
          &larr; Back to all posts
        </Link>
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {post.category}
          </span>
          <span className="text-muted-foreground text-sm">{post.publishedAt} • {post.readingTime}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          {post.title}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-y border-border py-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-foreground">{post.author.name}</p>
              <p className="text-sm text-muted-foreground line-clamp-1">{post.author.bio}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-xl overflow-hidden bg-muted">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
      </div>

      <div 
        className="prose prose-lg md:prose-xl max-w-none dark:prose-invert mb-16"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="flex flex-wrap gap-2 mb-16 border-t border-border pt-8">
        <span className="font-semibold mr-2 flex items-center">Tags:</span>
        {post.tags.map(tag => (
          <Link href={\`/tags/\${tag.toLowerCase()}\`} key={tag} className="bg-muted text-muted-foreground hover:text-foreground px-3 py-1 rounded-md text-sm transition-colors">
            #{tag}
          </Link>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-8 mb-16">
        <h3 className="text-2xl font-bold mb-6">Comments</h3>
        
        {/* Comment Input */}
        <div className="mb-8">
          <textarea 
            className="w-full bg-background border border-border rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px] resize-none"
            placeholder="What are your thoughts?"
          />
          <div className="flex justify-end mt-2">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity">
              Post Comment
            </button>
          </div>
        </div>

        {/* Dummy Comments */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-muted shrink-0 overflow-hidden relative">
              <Image src="https://picsum.photos/100" alt="User" fill className="object-cover"/>
            </div>
            <div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-sm">John Smith</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <p className="text-foreground">Great article! I completely agree that separating the frontend and backend provides much better scalability and clear boundaries for the teams.</p>
              </div>
              <div className="flex items-center gap-4 mt-2 ml-2 text-xs text-muted-foreground font-medium">
                <button className="hover:text-primary transition-colors">Like (12)</button>
                <button className="hover:text-primary transition-colors">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article >
  );
}
