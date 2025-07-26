"use client"

import React, { useState, useEffect } from 'react';

const LogoCanvas = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure smooth animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-mcd-purple/20 via-mcd-gold/10 to-mcd-purple/20 rounded-2xl animate-pulse" />
      
      {/* Main logo */}
      <div className={`relative z-10 transition-all duration-1000 transform ${
        isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-12'
      }`}>
        <div className="text-center">
          {/* Primary logo text */}
          <div className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-mcd-gold via-yellow-300 to-mcd-gold bg-clip-text text-transparent animate-shimmer bg-300% leading-none">
            MC&D
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-mcd-gold rounded-full animate-bounce delay-0" />
            <div className="w-2 h-2 bg-mcd-gold rounded-full animate-bounce delay-150" />
            <div className="w-2 h-2 bg-mcd-gold rounded-full animate-bounce delay-300" />
          </div>
        </div>
      </div>
      
      {/* Subtle rotating border */}
      <div className="absolute inset-2 border border-mcd-gold/30 rounded-2xl animate-spin-slow" />
    </div>
  );
};

export default LogoCanvas;