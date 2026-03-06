'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Loader2 } from 'lucide-react';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Simple debounce implementation
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.trim() === '') {
            setResults([]);
            setHasSearched(false);
            return;
        }

        const searchPosts = async () => {
            setLoading(true);
            setHasSearched(true);
            try {
                // Mock API call to our backend search endpoint
                // e.g. /api/posts?search=\${debouncedQuery}
                setTimeout(() => {
                    setResults([
                        { id: 1, title: \`Result 1 for \${debouncedQuery}\`, excerpt: 'This is a mocked search result from the backend. Real data would match the search semantics better.' },
            { id: 2, title: \`Another hit for \${debouncedQuery}\`, excerpt: 'Express and MongoDB makes querying full text search quite performant if indexed right.' }
          ]);
          setLoading(false);
        }, 800);
      } catch (err) {
        setLoading(false);
      }
    };

    searchPosts();
  }, [debouncedQuery]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[70vh]">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Search the Blog</h1>
      
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-muted-foreground mr-3" />
        </div>
        <input
          type="text"
          className="w-full bg-card border-2 border-border rounded-xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Search for Next.js, Architecture, MongoDB..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div>
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
            <p>Searching our database...</p>
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-xl border border-border">
            <h3 className="text-xl font-bold mb-2">No results found</h3>
            <p className="text-muted-foreground">We couldn't find anything matching "{debouncedQuery}". Try another keyword.</p>
          </div>
        )}

        {!loading && hasSearched && results.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              Found <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-sm mx-2">{results.length}</span> results for "{debouncedQuery}"
            </h3>
            <div className="space-y-6">
              {results.map((post) => (
                <Link href={\`/blog/search-result-\${post.id}\`} key={post.id} className="block group bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all">
                  <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h4>
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
