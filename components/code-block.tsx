"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Maximize,
  Minimize,
  WrapText,
  Search,
  Download,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  PRISM - Optimized Loading                                                  */
/* -------------------------------------------------------------------------- */
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
/* Preload only essential languages */
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
}

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

export function CodeBlock({ code, language = "text", fileName }: CodeBlockProps) {
  /* -------------------------------------------------------- Refs */
  const preRef = useRef<HTMLPreElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  /* -------------------------------------------------------- State */
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMatch, setCurrentMatch] = useState(0);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  
  /* -------------------------------------------------------- Calculations */
  const lineCount = useMemo(() => code.split("\n").length, [code]);
  
  /* -------------------------------------------------------- Search Logic */
  const searchMatches = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const regex = new RegExp(
      searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "gi"
    );
    return [...code.matchAll(regex)].map(match => match.index!);
  }, [code, searchTerm]);
  
  const totalMatches = searchMatches.length;
  
  const updateSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentMatch(0);
  }, []);
  
  const gotoMatch = useCallback((direction: 1 | -1) => {
    if (!totalMatches) return;
    
    const nextMatch = (currentMatch + direction + totalMatches) % totalMatches;
    setCurrentMatch(nextMatch);
    
    const matchElement = preRef.current?.querySelector(`[data-match="${nextMatch}"]`);
    matchElement?.scrollIntoView({ 
      block: "center", 
      behavior: "smooth" 
    });
  }, [currentMatch, totalMatches]);
  
  /* -------------------------------------------------------- Highlighting */
  useEffect(() => {
    if (!preRef.current) return;
    
    // Use requestAnimationFrame for smoother rendering
    const rafId = requestAnimationFrame(() => {
      const codeElement = preRef.current?.querySelector("code");
      if (codeElement) {
        Prism.highlightElement(codeElement);
        if (language !== "text" && showLineNumbers) {
          Prism.plugins.lineNumbers.resize(preRef.current!);
        }
      }
    });
    
    return () => cancelAnimationFrame(rafId);
  }, [code, language, showLineNumbers]);
  
  /* -------------------------------------------------------- Keyboard Shortcuts */
  useEffect(() => {
    if (!isExpanded) return;
    
    const handleKeydown = (e: KeyboardEvent) => {
      // Skip if typing in an input field
      if (e.target instanceof HTMLInputElement) return;
      
      // Only handle Ctrl/Cmd + key combinations
      if (!(e.ctrlKey || e.metaKey)) return;
      
      e.preventDefault();
      
      switch (e.key.toLowerCase()) {
        case "c":
          copy();
          break;
        case "f":
          openSearch();
          break;
        case "s":
          download();
          break;
        case "g":
          gotoMatch(e.shiftKey ? -1 : 1);
          break;
        case "escape":
          if (showSearch) {
            closeSearch();
          } else if (isExpanded) {
            setIsExpanded(false);
          }
          break;
      }
    };
    
    document.addEventListener("keydown", handleKeydown as any);
    return () => document.removeEventListener("keydown", handleKeydown as any);
  }, [isExpanded, showSearch, gotoMatch]);
  
  /* -------------------------------------------------------- Utility Functions */
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }, [code]);
  
  const download = useCallback(() => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || `code.${language === "text" ? "txt" : language}`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }, [code, fileName, language]);
  
  const openSearch = useCallback(() => {
    setShowSearch(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  }, []);
  
  const closeSearch = useCallback(() => {
    setShowSearch(false);
    setSearchTerm("");
    setCurrentMatch(0);
  }, []);
  
  /* -------------------------------------------------------- Search Highlighting */
  const getHighlightedCode = useMemo(() => {
    if (!searchTerm || !totalMatches) return code;
    
    let lastIndex = 0;
    const fragments = [];
    let matchIndex = 0;
    
    for (const matchPosition of searchMatches) {
      // Add text before the match
      if (matchPosition > lastIndex) {
        fragments.push(code.substring(lastIndex, matchPosition));
      }
      
      // Add the matched text with highlighting
      const matchText = code.substring(matchPosition, matchPosition + searchTerm.length);
      fragments.push(
        <mark
          key={`match-${matchIndex}`}
          data-match={matchIndex}
          className="rounded-[2px]"
          style={{
            backgroundColor: BRAND.gold.alpha(0.3),
            color: BRAND.gold.light,
            ...(matchIndex === currentMatch ? { 
              outline: `2px solid ${BRAND.gold.DEFAULT}`,
              borderRadius: "3px"
            } : {})
          }}
        >
          {matchText}
        </mark>
      );
      
      lastIndex = matchPosition + searchTerm.length;
      matchIndex++;
    }
    
    // Add remaining text after the last match
    if (lastIndex < code.length) {
      fragments.push(code.substring(lastIndex));
    }
    
    return fragments;
  }, [code, searchTerm, searchMatches, currentMatch, totalMatches]);
  
  /* -------------------------------------------------------- Render */
  return (
    <div className="relative w-full">
      {/* Expanded Mode Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: BRAND.dark.alpha(0.9),
              backdropFilter: "blur(12px)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Main Code Block Container */}
      <motion.div
        className="relative rounded-xl overflow-hidden"
        layout
        initial={false}
        animate={{
          scale: isExpanded ? 1 : 1,
          opacity: 1
        }}
        transition={{ 
          type: "tween", 
          duration: 0.3,
          ease: "easeInOut"
        }}
        style={{
          position: isExpanded ? "fixed" : "relative",
          top: isExpanded ? "50%" : undefined,
          left: isExpanded ? "50%" : undefined,
          transform: isExpanded ? "translate(-50%, -50%)" : undefined,
          width: isExpanded ? "min(90vw, 1400px)" : "100%",
          height: isExpanded ? "min(90vh, 800px)" : undefined,
          zIndex: isExpanded ? 50 : undefined,
          border: `1px solid ${BRAND.gold.alpha(0.2)}`,
          background: `linear-gradient(to bottom, ${BRAND.dark.DEFAULT}, ${BRAND.dark.darker})`,
          boxShadow: isExpanded 
            ? `0 25px 80px ${BRAND.dark.alpha(0.9)}, 0 0 0 1px ${BRAND.gold.alpha(0.4)}, inset 0 1px 0 ${BRAND.gold.alpha(0.1)}` 
            : `0 4px 24px ${BRAND.dark.alpha(0.5)}`,
          borderRadius: isExpanded ? "20px" : "12px"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header 
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            background: `linear-gradient(to bottom, ${BRAND.dark.DEFAULT}, ${BRAND.dark.alpha(0.9)})`,
            borderBottom: `1px solid ${BRAND.gold.alpha(0.15)}`
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {fileName && (
              <span 
                className="truncate text-sm font-medium"
                style={{ color: BRAND.gold.DEFAULT }}
              >
                {fileName}
              </span>
            )}
            <span 
              className="text-xs uppercase tracking-wider font-mono"
              style={{ 
                color: BRAND.gold.alpha(0.7),
                letterSpacing: "0.05em"
              }}
            >
              {language}
            </span>
            {isExpanded && lineCount > 1 && (
              <span 
                className="text-xs ml-2 hidden md:inline"
                style={{ color: BRAND.gold.alpha(0.6) }}
              >
                {lineCount} {lineCount === 1 ? "line" : "lines"}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5">
            {isExpanded && (
              <>
                <button
                  aria-label="Toggle word wrap"
                  className="p-1.5 rounded-lg transition-colors"
                  style={{
                    backgroundColor: BRAND.gold.alpha(0.1),
                    color: wordWrap ? BRAND.gold.light : BRAND.gold.alpha(0.6)
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setWordWrap(!wordWrap);
                  }}
                >
                  <WrapText size={16} />
                </button>
                
                {language !== "text" && (
                  <button
                    aria-label="Toggle line numbers"
                    className="p-1.5 rounded-lg transition-colors"
                    style={{
                      backgroundColor: BRAND.gold.alpha(0.1),
                      color: showLineNumbers ? BRAND.gold.light : BRAND.gold.alpha(0.6)
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLineNumbers(!showLineNumbers);
                    }}
                  >
                    {showLineNumbers ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                )}
                
                <button
                  aria-label="Search"
                  className="p-1.5 rounded-lg transition-colors"
                  style={{
                    backgroundColor: BRAND.gold.alpha(0.1),
                    color: BRAND.gold.alpha(0.7)
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openSearch();
                  }}
                >
                  <Search size={16} />
                </button>
              </>
            )}
            
            <button
              aria-label="Download code"
              className="p-1.5 rounded-lg transition-colors"
              style={{
                backgroundColor: BRAND.gold.alpha(0.1),
                color: BRAND.gold.alpha(0.7)
              }}
              onClick={(e) => {
                e.stopPropagation();
                download();
              }}
            >
              <Download size={16} />
            </button>
            
            <button
              aria-label={isExpanded ? "Minimize" : "Expand"}
              className="p-1.5 rounded-lg transition-colors"
              style={{
                backgroundColor: BRAND.gold.alpha(0.1),
                color: BRAND.gold.alpha(0.7)
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
            
            <button
              aria-label={copied ? "Copied!" : "Copy code"}
              className="p-1.5 rounded-lg transition-colors relative"
              style={{
                backgroundColor: BRAND.gold.alpha(0.1),
                color: copied ? BRAND.gold.light : BRAND.gold.alpha(0.7)
              }}
              onClick={(e) => {
                e.stopPropagation();
                copy();
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            
            {isExpanded && (
              <div className="flex items-center gap-2">
                <span 
                  className="text-xs hidden md:inline opacity-60"
                  style={{ color: BRAND.gold.alpha(0.5) }}
                >
                  Press ESC to close
                </span>
                <button
                  aria-label="Close (ESC)"
                  className="p-1.5 rounded-lg transition-all duration-200 hover:bg-red-500/20 hover:scale-110"
                  style={{
                    color: BRAND.gold.alpha(0.7)
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </header>
        
        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-2 border-t"
              style={{ 
                borderColor: BRAND.gold.alpha(0.15),
                background: BRAND.dark.alpha(0.7)
              }}
            >
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => updateSearch(e.target.value)}
                    placeholder="Search in code..."
                    className="w-full bg-transparent border-0 focus:outline-none text-sm"
                    style={{ 
                      color: BRAND.gold.light,
                      borderBottom: `1px solid ${BRAND.gold.alpha(0.3)}`,
                      paddingBottom: "4px"
                    }}
                  />
                  {searchTerm && (
                    <button
                      aria-label="Clear search"
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-1"
                      style={{ color: BRAND.gold.alpha(0.5) }}
                      onClick={() => updateSearch("")}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {totalMatches > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="text-sm"
                      style={{ color: BRAND.gold.alpha(0.8) }}
                    >
                      {currentMatch + 1}/{totalMatches}
                    </span>
                    <button
                      aria-label="Previous match"
                      className="p-1 rounded transition-colors"
                      style={{ 
                        backgroundColor: BRAND.gold.alpha(0.1),
                        color: BRAND.gold.alpha(0.7)
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        gotoMatch(-1);
                      }}
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      aria-label="Next match"
                      className="p-1 rounded transition-colors"
                      style={{ 
                        backgroundColor: BRAND.gold.alpha(0.1),
                        color: BRAND.gold.alpha(0.7)
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        gotoMatch(1);
                      }}
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Code Area */}
        <div 
          className="overflow-auto"
          style={{ 
            maxHeight: isExpanded 
              ? "calc(100% - 80px)" 
              : "24rem",
            minHeight: isExpanded ? "300px" : undefined,
            height: isExpanded ? "calc(100% - 80px)" : undefined
          }}
        >
          <pre
            ref={preRef}
            className={[
              "font-mono text-sm",
              language !== "text" && showLineNumbers && lineCount > 1 ? "line-numbers" : "",
              wordWrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
            ].filter(Boolean).join(" ")}
            style={{
              padding: "1.25rem",
              margin: 0,
              background: "transparent",
              color: "rgba(255, 255, 255, 0.9)"
            }}
          >
            <code
              className={`language-${language}`}
              suppressHydrationWarning
              style={{
                scrollBehavior: "smooth"
              }}
            >
              {getHighlightedCode}
            </code>
          </pre>
        </div>
        
        {/* Collapsed Mode Badges */}
        {!isExpanded && lineCount > 1 && (
          <div 
            className="absolute bottom-3 right-3 flex items-center gap-2"
            style={{ pointerEvents: "none" }}
          >
            <div 
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{
                backgroundColor: BRAND.dark.alpha(0.7),
                borderColor: BRAND.gold.alpha(0.3),
                borderWidth: "1px",
                color: BRAND.gold.light
              }}
            >
              {lineCount} {lineCount === 1 ? "line" : "lines"}
            </div>
            <div 
              className="px-2 py-1 rounded-md text-xs font-mono uppercase tracking-wider"
              style={{
                backgroundColor: BRAND.purple.alpha(0.15),
                borderColor: BRAND.purple.alpha(0.3),
                borderWidth: "1px",
                color: BRAND.purple.light
              }}
            >
              {language}
            </div>
          </div>
        )}
        
        {/* Copy Confirmation */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md"
              style={{
                background: BRAND.gold.DEFAULT,
                color: BRAND.dark.darker
              }}
            >
              <Check size={14} />
              <span className="text-sm font-medium">Copied!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}