'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  
  // Don't show on home page
  if (pathname === '/') return null;

  return (
    <nav className="absolute top-0 left-0 w-full p-4 z-10">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-inconsolata group"
        >
          <svg 
            className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          back home
        </Link>
      </div>
    </nav>
  );
} 