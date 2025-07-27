"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { KeyboardEvent } from "react";
import {
  Copy,
  Check,
  Maximize,
  Minimize,
  X,
  WrapText,
  Search,
  Download,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  PRISM  – load only once, dynamic languages                                */
/* -------------------------------------------------------------------------- */
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";

/* preload the common languages */
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-sql";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
interface Props {
  code: string;
  language?: string;
  fileName?: string;
}

export function CodeBlock({ code, language = "text", fileName }: Props) {
  /* ------------------------------------------------------------------ refs */
  const preRef = useRef<HTMLPreElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* -------------------------------------------------------------- state */
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMatch, setCurrentMatch] = useState(0);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  /* ---------------------------------------------------------- line count */
  const lineCount = useMemo(() => code.split("\n").length, [code]);

  /* -------------------------------------------------------- highlighting */
  useEffect(() => {
    if (!preRef.current) return;

    const timer = setTimeout(() => {
      Prism.highlightElement(preRef.current!.querySelector("code")!);
      if (language !== "text") {
        Prism.plugins.lineNumbers.resize(preRef.current!);
      }
    }, 16);

    return () => clearTimeout(timer);
  }, [code, language]);

  /* -------------------------------------------------------------- search */
  const searchMatches = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const regex = new RegExp(
      searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "gi",
    );
    return [...code.matchAll(regex)].map((m) => m.index!);
  }, [code, searchTerm]);

  const totalMatches = searchMatches.length;

  const updateSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentMatch(0);
  };

  const gotoMatch = useCallback(
    (dir: 1 | -1) => {
      if (!totalMatches) return;
      const next =
        (currentMatch + dir + totalMatches) % totalMatches;
      setCurrentMatch(next);

      const node = preRef.current?.querySelector(`[data-match="${next}"]`);
      node?.scrollIntoView({ block: "center", behavior: "smooth" });
    },
    [currentMatch, totalMatches],
  );

  /* ------------------------------------------------------------ keyboard */
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (!expanded) return;
      if (e.target instanceof HTMLInputElement) return;

      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "c":
            e.preventDefault();
            copy();
            break;
          case "f":
            e.preventDefault();
            openSearch();
            break;
          case "s":
            e.preventDefault();
            download();
            break;
          case "g":
            e.preventDefault();
            gotoMatch(e.shiftKey ? -1 : 1);
            break;
          case "Escape":
            if (showSearch) closeSearch();
            else setExpanded(false);
            break;
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded, showSearch, gotoMatch]);

  /* ---------------------------------------------------------- helpers */
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      const t = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(t);
    } catch {
      /* ignore */
    }
  }, [code]);

  const download = useCallback(() => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: fileName || `code.${language === "text" ? "txt" : language}`,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
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

  /* ----------------------------------------------------- render helpers */
  const highlightedCode = useMemo(() => {
    if (!searchTerm || !totalMatches) return code;

    let last = 0,
      idx = 0;
    const parts = searchMatches.map((pos) => {
      const before = code.slice(last, pos);
      const match = code.slice(pos, pos + searchTerm.length);
      const node = (
        <mark
          key={idx}
          data-match={idx++}
          className={`bg-yellow-400/30 text-yellow-200 ${
            idx - 1 === currentMatch ? "ring-2 ring-yellow-400" : ""
          }`}
        >
          {match}
        </mark>
      );
      last = pos + searchTerm.length;
      return (
        <>
          {before}
          {node}
        </>
      );
    });

    return (
      <>
        {parts}
        {code.slice(last)}
      </>
    );
  }, [code, searchTerm, searchMatches, currentMatch]);

  /* ---------------------------------------------------------- render */
  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative rounded-xl overflow-hidden border border-mcd-gold/30 bg-gradient-to-br from-mcd-dark/90 to-mcd-darkest shadow-2xl"
        layout
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: expanded ? "fixed" : "relative",
          top: expanded ? "50%" : undefined,
          left: expanded ? "50%" : undefined,
          transform: expanded ? "translate(-50%, -50%)" : undefined,
          width: expanded ? "calc(100vw - 4rem)" : "100%",
          height: expanded ? "calc(100vh - 4rem)" : undefined,
          zIndex: expanded ? 50 : undefined,
        }}
      >
        {/* ------------------------------------------------ header */}
        <header className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-mcd-gold/10 via-mcd-gold/5 to-transparent border-b border-mcd-gold/20">
          <div className="truncate flex items-center gap-3">
            {/* traffic lights */}
            <div className="flex gap-1.5">
              <button
                aria-label="Close"
                className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
              />
              <button
                aria-label="Toggle size"
                className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded((b) => !b);
                }}
              />
              <button
                aria-label="Expand"
                className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(true);
                }}
              />
            </div>

            {/* file / language */}
            <div className="truncate">
              {fileName && (
                <div className="text-xs text-mcd-gold/70 truncate max-w-[120px] md:max-w-[200px]">
                  {fileName}
                </div>
              )}
              <span className="text-sm font-mono text-mcd-gold/90">
                {language}
              </span>
            </div>

            {/* badges */}
            {expanded && language !== "text" && (
              <div className="text-xs text-mcd-gold/50 ml-2 flex items-center gap-2">
                <span>
                  {lineCount} {lineCount === 1 ? "line" : "lines"}
                </span>
                {totalMatches > 0 && (
                  <span>
                    {currentMatch + 1}/{totalMatches} matches
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ---------------------------------------------------- controls */}
          <div className="flex items-center gap-1">
            {expanded && (
              <>
                <button
                  aria-label="Toggle word wrap"
                  className="p-1.5 rounded-md hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setWordWrap((b) => !b);
                  }}
                >
                  <WrapText size={16} />
                </button>

                {language !== "text" && (
                  <button
                    aria-label="Toggle line numbers"
                    className="p-1.5 rounded-md hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLineNumbers((b) => !b);
                    }}
                  >
                    {showLineNumbers ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                )}

                <button
                  aria-label="Search"
                  className="p-1.5 rounded-md hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold"
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
              aria-label="Download"
              className="p-1.5 rounded-md hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold"
              onClick={(e) => {
                e.stopPropagation();
                download();
              }}
            >
              <Download size={16} />
            </button>

            <button
              aria-label={expanded ? "Minimize" : "Expand"}
              className="p-1.5 rounded-md hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((b) => !b);
              }}
            >
              {expanded ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>

            <button
              aria-label="Copy"
              className="p-1.5 rounded-md hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold"
              onClick={(e) => {
                e.stopPropagation();
                copy();
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>

            {expanded && (
              <button
                aria-label="Close"
                className="p-1.5 rounded-md hover:bg-red-500/20 text-mcd-gold/70 hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </header>

        {/* ------------------------------------------------ search bar */}
        <AnimatePresence>
          {showSearch && expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-mcd-gold/20 px-4 py-2"
            >
              <div className="flex gap-2">
                <input
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(e) => updateSearch(e.target.value)}
                  placeholder="Search…"
                  className="flex-1 bg-mcd-dark/50 border border-mcd-gold/30 rounded-md px-3 py-1 text-sm text-mcd-gold placeholder-mcd-gold/50 focus:outline-none focus:ring-1 focus:ring-mcd-gold"
                />
                {totalMatches > 0 && (
                  <>
                    <span className="text-sm text-mcd-gold/80 self-center">
                      {currentMatch + 1}/{totalMatches}
                    </span>
                    <button
                      aria-label="Previous match"
                      className="p-1 rounded-md hover:bg-mcd-gold/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        gotoMatch(-1);
                      }}
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      aria-label="Next match"
                      className="p-1 rounded-md hover:bg-mcd-gold/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        gotoMatch(1);
                      }}
                    >
                      <ChevronDown size={14} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ------------------------------------------------ code */}
        <div className="relative flex-1 overflow-auto">
          <pre
            ref={preRef}
            className={[
              "p-4 font-mono text-sm leading-snug",
              language !== "text" && showLineNumbers ? "line-numbers" : "",
              wordWrap ? "whitespace-pre-wrap break-words" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              maxHeight: expanded ? undefined : "24rem",
            }}
          >
            <code
              className={`language-${language}`}
              suppressHydrationWarning
            >
              {highlightedCode}
            </code>
          </pre>
        </div>

        {/* ------------------------------------------------ badges */}
        {!expanded && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className="bg-mcd-dark/90 border border-mcd-gold/30 text-mcd-gold/80 text-xs px-2 py-1 rounded-md">
              {lineCount}
            </span>
            <span className="bg-mcd-purple/20 border border-mcd-purple/40 text-mcd-purple text-xs px-2 py-1 rounded-md font-mono">
              {language.toUpperCase()}
            </span>
          </div>
        )}

        {/* ------------------------------------------------ copied toast */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 bg-mcd-gold text-mcd-darkest px-3 py-2 rounded-md shadow-lg flex items-center gap-2 text-sm"
            >
              <Check size={16} />
              Copied
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}