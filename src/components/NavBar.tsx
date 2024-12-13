'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  
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
        {/* Left side - only show back button if not on home page */}
        {pathname !== '/' && (
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-inconsolata group"
          >
            <FontAwesomeIcon 
              icon={faArrowLeft}
              className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" 
            />
            back home
          </Link>
        )}
        {/* If on home page, add an empty div to maintain flex layout */}
        {pathname === '/' && <div></div>}

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/michellejw/code-game-03"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-inconsolata group"
          >
            <FontAwesomeIcon 
              icon={faGithub} 
              className="w-6 h-6 mr-4 transition-transform hover:scale-110" 
            />
          </Link>

          <button
            onClick={handleReset}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-inconsolata group"
          >
            <FontAwesomeIcon 
              icon={faArrowsRotate}
              className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" 
            />
            reset game
          </button>
        </div>
      </div>
    </nav>
  );
} 