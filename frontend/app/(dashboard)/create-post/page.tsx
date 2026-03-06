'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamically import editor to avoid SSR issues with DOM
const Editor = dynamic(() => import('@/components/blog/Editor'), { ssr: false });

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [status, setStatus] = useState<'draft' | 'published'>('draft');
    const [visibility, setVisibility] = useState<'public' | 'private'>('public');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            // For a real app, you would fetch available categories, here we map to a placeholder for MVP
            const dummyCategoryId = '64abcd1234abcd1234abcd12'; // Must be a valid ObjectId format if testing against real DB

            const res = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: \`Bearer \${token}\`,
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          coverImage,
          status,
          visibility,
          wordCount: content.split(' ').length,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          category: dummyCategoryId, 
          // tags: []
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/dashboard');
      } else {
        alert(data.message || 'Error creating post');
      }
    } catch (err) {
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
        <h1 className="text-3xl font-bold">Write a New Post</h1>
        <div className="flex gap-4">
          <button 
            type="button" 
            className="px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted"
            onClick={() => setStatus('draft')}
          >
            Save Draft
          </button>
          <button 
            type="button" 
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90"
            onClick={(e) => {
              setStatus('published');
              handleSave(e as any);
            }}
          >
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <input
              type="text"
              placeholder="Post Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50 text-foreground"
            />
          </div>
          
          <div className="min-h-[500px]">
            <Editor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-md p-5">
            <h3 className="font-semibold mb-4 text-lg">Post Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <textarea 
                  rows={3} 
                  className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                  placeholder="Brief summary for SEO and card previews..."
                  maxLength={300}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                <input 
                  type="text" 
                  className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                  placeholder="https://images.unsplash.com/..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Visibility</label>
                <select 
                  className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as any)}
                >
                  <option value="public">Public</option>
                  <option value="members">Members Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
