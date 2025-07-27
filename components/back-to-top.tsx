"use client"

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
      // Calculate scroll progress percentage (0-100)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.min(100, Math.round((window.pageYOffset / totalScroll) * 100)));
    } else {
      setIsVisible(false);
      setProgress(0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
      }`}
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Back to top"
    >
      <div className="relative">
        {/* Progress ring */}
        <svg 
          className="w-14 h-14 -rotate-90" 
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(139, 92, 246, 0.2)" // purple-500/20
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * progress) / 100}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" /> {/* purple-500 */}
              <stop offset="100%" stopColor="#F59E0B" /> {/* amber-500 */}
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center icon */}
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered 
              ? 'bg-gradient-to-br from-purple-600 to-amber-600 scale-110 shadow-lg' 
              : 'bg-gradient-to-br from-purple-500 to-amber-500'
          }`}
        >
          <ArrowUp 
            className={`h-5 w-5 text-white transition-transform ${
              isHovered ? '-translate-y-0.5' : ''
            }`} 
          />
        </div>
      </div>
      
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full right-0 mb-3 px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-md shadow-lg transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        Back to top
        <div className="absolute top-full right-4 w-3 h-3 bg-gray-900 rotate-45"></div>
      </div>
    </button>
  );
};

export default BackToTop;