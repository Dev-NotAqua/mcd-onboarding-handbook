"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Brand color definitions
  const BRAND = {
    gold: {
      light: "#FAD02C",
      DEFAULT: "#D4AF37",
      dark: "#B8860B",
      alpha: (opacity: number) => `rgba(212, 175, 55, ${opacity})`
    },
    purple: {
      light: "#6A4C93",
      DEFAULT: "#462569",
      dark: "#2D1A44",
      alpha: (opacity: number) => `rgba(70, 37, 105, ${opacity})`
    },
    dark: {
      DEFAULT: "#121212",
      darker: "#0A0A0A",
      alpha: (opacity: number) => `rgba(18, 18, 18, ${opacity})`
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show after 50px scroll
      if (scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.7)",
        transition: "all 0.3s ease-in-out",
        pointerEvents: isVisible ? "auto" : "none",
        border: "none",
        background: "none",
        padding: 0,
        cursor: "pointer"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "56px",
          height: "56px",
          borderRadius: "12px",
          background: `linear-gradient(to bottom, ${BRAND.dark.DEFAULT}, ${BRAND.dark.darker})`,
          boxShadow: `0 4px 24px ${BRAND.dark.alpha(0.5)}`
        }}
      >
        {/* Progress ring */}
        <svg
          style={{
            width: "56px",
            height: "56px",
            transform: "rotate(-90deg)",
            position: "absolute",
            top: 0,
            left: 0
          }}
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={BRAND.gold.alpha(0.15)}
            strokeWidth="5"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="5"
            strokeDasharray="251.2"
            strokeDashoffset="251.2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={BRAND.gold.light} />
              <stop offset="100%" stopColor={BRAND.purple.light} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center icon */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isHovered ? "44px" : "40px",
            height: isHovered ? "44px" : "40px",
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${BRAND.gold.DEFAULT}, ${BRAND.purple.DEFAULT})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: isHovered
              ? `0 0 20px ${BRAND.gold.alpha(0.5)}`
              : `0 3px 8px ${BRAND.dark.alpha(0.4)}`,
            border: `1px solid ${BRAND.gold.alpha(0.3)}`
          }}
        >
          <ChevronUp
            style={{
              width: "20px",
              height: "20px",
              color: "white",
              transform: isHovered ? "translateY(-2px)" : "none",
              transition: "transform 0.3s ease"
            }}
          />
        </div>
      </div>

      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: isHovered ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(5px)",
          marginBottom: "12px",
          padding: "6px 12px",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "8px",
          boxShadow: `0 4px 12px ${BRAND.dark.alpha(0.3)}`,
          zIndex: 9999,
          background: BRAND.dark.DEFAULT,
          color: BRAND.gold.light,
          whiteSpace: "nowrap",
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? "visible" : "hidden",
          transition: "all 0.2s ease-in-out",
          border: `1px solid ${BRAND.gold.alpha(0.2)}`,
          textAlign: "center",
          minWidth: "max-content"
        }}
      >
        Back to top
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            width: "8px",
            height: "8px",
            background: BRAND.dark.DEFAULT,
            borderRight: `1px solid ${BRAND.gold.alpha(0.2)}`,
            borderBottom: `1px solid ${BRAND.gold.alpha(0.2)}`,
            transform: "translateX(-50%) rotate(45deg)",
            transformOrigin: "center"
          }}
        />
      </div>
    </button>
  );
};

export default BackToTop;