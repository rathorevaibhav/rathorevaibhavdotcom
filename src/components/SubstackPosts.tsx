
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Post {
  title: string;
  url: string;
  date: string;
  thumbnail: string;
  excerpt: string;
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
          
          // Extract thumbnail from enclosure or content
          let thumbnail = '';
          const enclosure = item.querySelector('enclosure');
          if (enclosure && enclosure.getAttribute('type')?.startsWith('image/')) {
            thumbnail = enclosure.getAttribute('url') || '';
          } else {
            // Try to extract from content if no enclosure
            const content = item.querySelector('content\\:encoded')?.textContent || '';
            const imgMatch = content.match(/<img.+?src=["'](.+?)["'].*?>/);
            if (imgMatch && imgMatch[1]) {
              thumbnail = imgMatch[1];
            }
          }
          
          // Extract excerpt from content - aim for at least 30 words
          let excerpt = '';
          const description = item.querySelector('description')?.textContent || '';
          if (description) {
            // Strip HTML tags and get plain text
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = description;
            excerpt = tempDiv.textContent || tempDiv.innerText || '';
            
            // Get approximately 30+ words (around 200-250 characters)
            const words = excerpt.split(/\s+/);
            if (words.length > 30) {
              excerpt = words.slice(0, 30).join(' ');
              // Find the last complete sentence if possible
              const lastPeriodIndex = excerpt.lastIndexOf('.');
              if (lastPeriodIndex > excerpt.length * 0.7) { // If period is in the latter part
                excerpt = excerpt.substring(0, lastPeriodIndex + 1);
              } else {
                excerpt += '...';
              }
            } else if (excerpt.length > 0) {
              // If less than 30 words, use whatever we have
              excerpt += '...';
            }
          }
          
          return { title, url, date, thumbnail, excerpt };
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

  // Render post with responsive layout - stacked for mobile and side-by-side for desktop
  const renderPost = (post: Post) => (
    <Card className="hover:shadow-md transition-shadow mb-4">
      <CardContent className="p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Mobile: Image on top, Desktop: Image on left */}
          <div className="w-full md:w-1/3 relative h-full">
            {post.thumbnail ? (
              <div className="h-48 md:h-full">
                <AspectRatio ratio={16 / 9} className="h-full">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="object-cover w-full h-full rounded-t-lg md:rounded-t-none md:rounded-l-lg" 
                  />
                </AspectRatio>
              </div>
            ) : (
              <div className="bg-accent h-48 md:h-full flex items-center justify-center rounded-t-lg md:rounded-t-none md:rounded-l-lg">
                <span className="text-primary/60">No image</span>
              </div>
            )}
          </div>
          {/* Content section - below thumbnail on mobile, right side on desktop */}
          <div className="p-6 md:flex-1">
            <h3 className="text-xl font-bold">
              <a 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-primary flex items-start gap-1 group"
              >
                {post.title}
                <ExternalLink className="h-4 w-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </h3>
            {post.excerpt && (
              <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
            )}
            <p className="text-sm text-gray-500 mt-3">{post.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recent Posts</h2>
      
      {loading && (
        <div className="text-gray-500">Loading recent posts...</div>
      )}
      
      {error && (
        <div className="text-red-500">{error}</div>
      )}
      
      {!loading && !error && posts.length > 0 && (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index}>
              {renderPost(post)}
            </div>
          ))}
        </div>
      )}
      
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
