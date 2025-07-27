"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Check, Maximize, Minimize, X, WrapText, Search, Download, Eye, EyeOff } from "lucide-react"
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

interface CodeBlockProps {
  code: string
  language?: string
  fileName?: string
}

export function CodeBlock({ code, language = "text", fileName }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [wordWrap, setWordWrap] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const codeRef = useRef<HTMLElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Initialize syntax highlighting
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
      
      // Add line numbers if needed
      if (language !== 'text' && preRef.current) {
        Prism.plugins.lineNumbers.resize(preRef.current)
      }
    }
  }, [code, language, expanded])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName || `code.${language === 'text' ? 'txt' : language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
    if (!showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    } else {
      setSearchTerm("")
    }
  }

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-400/30 text-yellow-200">$1</mark>')
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!expanded) return
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'c':
            if (!showSearch) {
              e.preventDefault()
              copyToClipboard()
            }
            break
          case 'f':
            e.preventDefault()
            toggleSearch()
            break
          case 's':
            e.preventDefault()
            downloadCode()
            break
        }
      }
      
      if (e.key === 'Escape') {
        if (showSearch) {
          setShowSearch(false)
          setSearchTerm("")
        } else {
          setExpanded(false)
        }
      }
    }

    if (expanded) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [expanded, showSearch])

  // Calculate lines of code
  const lineCount = code.split('\n').length

  return (
    <>
      {/* Backdrop for expanded mode */}
      {expanded && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setExpanded(false)}
        />
      )}
      
      <div 
        className={`relative group rounded-xl overflow-hidden border border-mcd-gold/30 bg-gradient-to-br from-mcd-dark/90 to-mcd-darkest shadow-xl transition-all duration-300 ${
          expanded ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] h-[calc(100%-2rem)] md:w-[calc(100%-8rem)] md:h-[calc(100%-8rem)] flex flex-col" : ""
        }`}
      >
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r from-mcd-gold/10 via-mcd-gold/5 to-transparent px-4 py-2 border-b border-mcd-gold/20 ${expanded ? 'sticky top-0 z-10' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 truncate">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" onClick={() => setExpanded(false)}></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" onClick={toggleExpand}></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" onClick={toggleExpand}></div>
              </div>
              
              <div className="truncate">
                {fileName && (
                  <div className="text-xs text-mcd-gold/70 truncate max-w-[120px] md:max-w-[200px] font-medium">
                    {fileName}
                  </div>
                )}
                <span className="text-sm font-medium text-mcd-gold/90 font-mono truncate">
                  {language}
                </span>
              </div>
              
              {language !== 'text' && expanded && (
                <div className="text-xs text-mcd-gold/50 ml-2 flex items-center gap-2">
                  <span className="bg-mcd-gold/10 px-2 py-1 rounded border border-mcd-gold/20">
                    {lineCount} {lineCount === 1 ? 'line' : 'lines'}
                  </span>
                  {searchTerm && (
                    <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded border border-yellow-500/30">
                      "{searchTerm}"
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex gap-1">
              {/* Word wrap toggle */}
              {expanded && (
                <button
                  onClick={() => setWordWrap(!wordWrap)}
                  className={`p-1.5 rounded-md transition-all duration-200 group/wrap ${
                    wordWrap 
                      ? 'bg-mcd-gold/20 text-mcd-gold' 
                      : 'hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold'
                  }`}
                  aria-label="Toggle word wrap"
                >
                  <WrapText className="h-4 w-4 group-hover/wrap:scale-110 transition-transform" />
                </button>
              )}
              
              {/* Line numbers toggle */}
              {expanded && language !== 'text' && (
                <button
                  onClick={() => setShowLineNumbers(!showLineNumbers)}
                  className={`p-1.5 rounded-md transition-all duration-200 group/lines ${
                    showLineNumbers 
                      ? 'bg-mcd-gold/20 text-mcd-gold' 
                      : 'hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold'
                  }`}
                  aria-label="Toggle line numbers"
                >
                  {showLineNumbers ? (
                    <Eye className="h-4 w-4 group-hover/lines:scale-110 transition-transform" />
                  ) : (
                    <EyeOff className="h-4 w-4 group-hover/lines:scale-110 transition-transform" />
                  )}
                </button>
              )}
              
              {/* Search toggle */}
              {expanded && (
                <button
                  onClick={toggleSearch}
                  className={`p-1.5 rounded-md transition-all duration-200 group/search ${
                    showSearch 
                      ? 'bg-mcd-gold/20 text-mcd-gold' 
                      : 'hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold'
                  }`}
                  aria-label="Search in code"
                >
                  <Search className="h-4 w-4 group-hover/search:scale-110 transition-transform" />
                </button>
              )}
              
              {/* Download button */}
              <button
                onClick={downloadCode}
                className="p-1.5 rounded-md hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold transition-colors duration-200 group/download"
                aria-label="Download code"
              >
                <Download className="h-4 w-4 group-hover/download:scale-110 transition-transform" />
              </button>
              
              {/* Expand/Minimize button */}
              <button
                onClick={toggleExpand}
                className="p-1.5 rounded-md hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold transition-colors duration-200 group/expand"
                aria-label={expanded ? "Minimize code" : "Expand code"}
              >
                {expanded ? (
                  <Minimize className="h-4 w-4 group-hover/expand:scale-110 transition-transform" />
                ) : (
                  <Maximize className="h-4 w-4 group-hover/expand:scale-110 transition-transform" />
                )}
              </button>
              
              {/* Close button (only in expanded mode) */}
              {expanded && (
                <button
                  onClick={() => setExpanded(false)}
                  className="p-1.5 rounded-md hover:bg-red-500/20 text-mcd-gold/70 hover:text-red-400 transition-colors duration-200 group/close"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 group-hover/close:scale-110 transition-transform" />
                </button>
              )}
              
              {/* Copy button */}
              <button
                onClick={copyToClipboard}
                className="p-1.5 rounded-md hover:bg-mcd-gold/20 text-mcd-gold/70 hover:text-mcd-gold transition-colors duration-200 group/copy relative"
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400 group-hover/copy:scale-110 transition-transform" />
                ) : (
                  <Copy className="h-4 w-4 group-hover/copy:scale-110 transition-transform" />
                )}
                
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-mcd-gold text-mcd-darkest text-xs px-2 py-1 rounded-md shadow-lg opacity-0 group-hover/copy:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                  {copied ? "Copied!" : "Copy to clipboard"}
                </div>
              </button>
            </div>
          </div>
          
          {/* Search bar */}
          {showSearch && expanded && (
            <div className="mt-3 pt-3 border-t border-mcd-gold/20">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search in code... (Ctrl+F)"
                  className="w-full bg-mcd-dark/50 border border-mcd-gold/30 rounded-md px-3 py-2 text-sm text-mcd-gold placeholder-mcd-gold/50 focus:outline-none focus:ring-2 focus:ring-mcd-gold/50 focus:border-mcd-gold/50"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-mcd-gold/50">
                  ESC to close
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Code container with gradient overlay */}
        <div 
          className="relative flex-1 overflow-auto group/code"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-mcd-gold/3 via-transparent to-mcd-gold/3 pointer-events-none"></div>
          
          {/* Scrollbar styling overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-3 h-full bg-gradient-to-b from-mcd-gold/10 to-transparent opacity-0 group-hover/code:opacity-100 transition-opacity"></div>
          </div>
          
          <pre 
            ref={preRef}
            className={`p-4 font-mono text-sm transition-all duration-300 ${
              language !== 'text' && showLineNumbers ? 'line-numbers' : ''
            } ${
              wordWrap ? 'whitespace-pre-wrap break-words' : 'overflow-x-auto'
            } ${
              isHovered ? 'bg-mcd-dark/20' : ''
            }`}
            style={{
              height: expanded ? '100%' : 'auto',
              maxHeight: expanded ? '100%' : '24rem',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(212, 175, 55, 0.3) transparent'
            }}
          >
            <code 
              ref={codeRef} 
              className={`language-${language} transition-all duration-200`}
              dangerouslySetInnerHTML={{
                __html: searchTerm ? highlightSearchTerm(code) : code
              }}
            />
          </pre>
          
          {/* Keyboard shortcuts hint */}
          {expanded && isHovered && (
            <div className="absolute bottom-4 right-4 bg-mcd-dark/90 border border-mcd-gold/30 rounded-lg p-3 text-xs text-mcd-gold/70 backdrop-blur-sm">
              <div className="space-y-1">
                <div><kbd className="bg-mcd-gold/20 px-1 rounded">Ctrl+C</kbd> Copy</div>
                <div><kbd className="bg-mcd-gold/20 px-1 rounded">Ctrl+F</kbd> Search</div>
                <div><kbd className="bg-mcd-gold/20 px-1 rounded">Ctrl+S</kbd> Download</div>
                <div><kbd className="bg-mcd-gold/20 px-1 rounded">Esc</kbd> Close</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Floating copy confirmation */}
        {copied && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-mcd-gold to-mcd-gold/80 text-mcd-darkest px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in-out z-20 border border-mcd-gold/30">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">Copied to clipboard!</div>
              <div className="text-xs opacity-80">{lineCount} lines copied</div>
            </div>
          </div>
        )}
        
        {/* Enhanced info badges */}
        {!expanded && (
          <div className="absolute bottom-3 right-3 flex gap-2">
            {/* Line count badge */}
            {language !== 'text' && (
              <div className="bg-mcd-dark/90 border border-mcd-gold/30 text-mcd-gold/80 text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                <div className="w-1.5 h-1.5 bg-mcd-gold rounded-full animate-pulse"></div>
                <span className="font-medium">{lineCount} {lineCount === 1 ? 'line' : 'lines'}</span>
              </div>
            )}
            
            {/* Language badge */}
            <div className="bg-mcd-purple/20 border border-mcd-purple/40 text-mcd-purple text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm font-mono font-medium shadow-lg">
              {language.toUpperCase()}
            </div>
          </div>
        )}
        
        {/* Hover overlay for non-expanded mode */}
        {!expanded && isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-mcd-gold/5 via-transparent to-transparent pointer-events-none rounded-xl transition-opacity duration-300" />
        )}
        
        {/* Loading state for syntax highlighting */}
        {language !== 'text' && !codeRef.current && (
          <div className="absolute inset-0 flex items-center justify-center bg-mcd-dark/50 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-3 text-mcd-gold/70">
              <div className="w-5 h-5 border-2 border-mcd-gold/30 border-t-mcd-gold rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Highlighting syntax...</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}