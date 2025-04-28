
import React from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { title: "Home", path: "/" },
  { title: "Work", path: "/work" },
  { title: "Books", path: "/books" },
  { title: "Movies", path: "/movies" },
  { title: "Music", path: "/music" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <Link to="/" className="text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
              Vaibhav Rathore
            </Link>
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
          </div>
        </nav>
      </header>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
