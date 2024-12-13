'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Don't show on home page
  if (pathname === '/') return null;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all game setups? This will clear all clue locations and hiding spots.')) {
      localStorage.removeItem('gameSetups');
      localStorage.removeItem('currentGameSet');
      router.push('/');
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full p-4 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
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

        <button
          onClick={handleReset}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-inconsolata group"
        >
          <svg
            className="w-5 h-5 mr-2 transform transition-transform group-hover:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          reset game
        </button>
      </div>
    </nav>
  );
} 