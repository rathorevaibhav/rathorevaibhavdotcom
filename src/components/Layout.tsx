
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ExternalLink, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Footer } from './Footer';

const menuItems = [
  { title: "Home", path: "/", external: false },
  { title: "Work", path: "/work", external: false },
  { title: "Books", path: "/books", external: false },
  { title: "Movies", path: "/movies", external: false },
  { title: "Music", path: "/music", external: false },
  { title: "Blog", path: "https://rathorevaibhav.substack.com/", external: true },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <Link to="/" className="text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
              Vaibhav Rathore
            </Link>
            
            {isMobile ? (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="w-full h-[100dvh]">
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="flex flex-col items-center gap-8 pt-12">
                    {menuItems.map((item) => (
                      item.external ? (
                        <a
                          key={item.title}
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-2xl font-medium text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                        >
                          {item.title}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <Link
                          key={item.title}
                          to={item.path}
                          className="text-2xl font-medium text-gray-600 hover:text-primary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <div className="flex space-x-8">
                {menuItems.map((item) => (
                  item.external ? (
                    <a
                      key={item.title}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      {item.title}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link
                      key={item.title}
                      to={item.path}
                      className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                    >
                      {item.title}
                    </Link>
                  )
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-1 py-8 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
