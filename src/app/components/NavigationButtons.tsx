'use client';

import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";

export default function NavigationButtons() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Share this page',
        url: window.location.href,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed top-6 w-full px-6 flex justify-between">
      <Link 
        href="/" 
        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 
                   text-white rounded-full shadow-lg backdrop-blur-sm 
                   transition-all duration-300 hover:scale-105"
      >
        <IoHomeOutline className="text-xl" />
        <span>Home</span>
      </Link>
      <button 
        onClick={handleShare} 
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                   text-white rounded-full shadow-lg backdrop-blur-sm 
                   transition-all duration-300 hover:scale-105"
      >
        <IoShareSocialOutline className="text-xl" />
        <span>Share</span>
      </button>
    </div>
  );
} 