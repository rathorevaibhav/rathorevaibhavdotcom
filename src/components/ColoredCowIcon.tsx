
import React from 'react';

interface ColoredCowIconProps {
  className?: string;
}

export function ColoredCowIcon({ className = "h-5 w-5" }: ColoredCowIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 2C8.5 2 6 4.5 6 8c0 1.5 0.5 2.8 1.3 3.8L5 16c-0.5 0.8-0.3 1.8 0.5 2.3 0.8 0.5 1.8 0.3 2.3-0.5L10 14h4l2.2 3.8c0.5 0.8 1.5 1 2.3 0.5 0.8-0.5 1-1.5 0.5-2.3l-2.3-4.2C17.5 10.8 18 9.5 18 8c0-3.5-2.5-6-6-6z"
        strokeWidth="0"
      />
      <circle cx="10" cy="7.5" r="1" />
      <circle cx="14" cy="7.5" r="1" />
      <path 
        d="M8 20c0 1.1 0.9 2 2 2h4c1.1 0 2-0.9 2-2v-1H8v1z"
        strokeWidth="0"
      />
    </svg>
  );
}
