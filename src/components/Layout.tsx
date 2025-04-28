
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const menuItems = [
  { title: "Home", path: "/" },
  { title: "Work", path: "/work" },
  { title: "Books", path: "/books" },
  { title: "Movies", path: "/movies" },
  { title: "Music", path: "/music" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <Link to="/" className="text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
              Vaibhav Rathore
            </Link>
            
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="w-full h-[100dvh] [&>button]:hidden">
                  <div className="flex justify-end mb-8">
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className="flex flex-col items-center gap-8">
                    {menuItems.map((item) => (
                      <SheetTrigger asChild key={item.title}>
                        <Link
                          to={item.path}
                          className="text-2xl font-medium text-gray-600 hover:text-primary transition-colors"
                        >
                          {item.title}
                        </Link>
                      </SheetTrigger>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <div className="flex space-x-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
