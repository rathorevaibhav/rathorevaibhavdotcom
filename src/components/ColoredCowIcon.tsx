
import React from 'react';

interface ColoredCowIconProps {
  className?: string;
}

export function ColoredCowIcon({ className = "h-5 w-5" }: ColoredCowIconProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M80 120c-8 0-15 7-15 15v20c0 25 20 45 45 45h15l-25 35c-15 20-10 50 15 60 20 8 40-5 45-25l15-30h80l15 30c5 20 25 33 45 25 25-10 30-40 15-60l-25-35h15c25 0 45-20 45-45v-20c0-8-7-15-15-15H80z"/>
      <path d="M160 80c0-25-20-45-45-45s-45 20-45 45c0 15 8 28 20 35l-35 50c-5 8-3 18 5 23 8 5 18 3 23-5l40-60c12 3 25 3 37 0l40 60c5 8 15 10 23 5 8-5 10-15 5-23l-35-50c12-7 20-20 20-35z"/>
      <circle cx="130" cy="80" r="8"/>
      <path d="M200 220c-30 0-55 25-55 55s25 55 55 55 55-25 55-55-25-55-55-55zm0 80c-15 0-25-10-25-25s10-25 25-25 25 10 25 25-10 25-25 25z"/>
      <path d="M320 160c-8-3-17 0-20 8l-10 25h-80c-8 0-15 7-15 15s7 15 15 15h90c6 0 11-3 13-8l15-35c3-8 0-17-8-20z"/>
    </svg>
  );
}
