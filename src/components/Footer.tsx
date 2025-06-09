
import React from 'react';
import { Linkedin, Github, Instagram } from 'lucide-react';
import { ColoredCowIcon } from './ColoredCowIcon';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-6">
            <a 
              href="https://linkedin.com/in/rathorevaibhav" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/rathorevaibhav" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com/rathorevaibhav" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://coloredcow.cm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
              aria-label="ColoredCow"
            >
              <ColoredCowIcon className="h-5 w-5" />
            </a>
          </div>
          <div className="text-sm text-gray-500">
            © {currentYear} Vaibhav Rathore. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
