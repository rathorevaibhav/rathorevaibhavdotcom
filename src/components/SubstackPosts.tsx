
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface Post {
  title: string;
  url: string;
  date: string;
}

export function SubstackPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // This is a proxy for the RSS feed as direct fetch may cause CORS issues
        const response = await fetch('https://api.allorigins.win/raw?url=https://rathorevaibhav.substack.com/feed');
        const data = await response.text();
        
        // Parse the XML
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        
        // Extract posts
        const items = xml.querySelectorAll('item');
        const parsedPosts = Array.from(items).slice(0, 3).map(item => {
          const title = item.querySelector('title')?.textContent || '';
          const url = item.querySelector('link')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent || '';
          const date = new Date(pubDate).toLocaleDateString('en-US', {
            year: 'numeric', 
            month: 'short', 
            day: 'numeric'
          });
          
          return { title, url, date };
        });
        
        setPosts(parsedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load recent posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recent Posts</h2>
      
      {loading && (
        <div className="text-gray-500">Loading recent posts...</div>
      )}
      
      {error && (
        <div className="text-red-500">{error}</div>
      )}
      
      <div className="grid gap-4">
        {posts.map((post, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h3 className="font-medium">
                <a 
                  href={post.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-primary flex items-center gap-1 group"
                >
                  {post.title}
                  <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </h3>
              <p className="text-sm text-gray-500 mt-1">{post.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <a 
          href="https://rathorevaibhav.substack.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 flex items-center gap-1 justify-center"
        >
          View all posts
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
