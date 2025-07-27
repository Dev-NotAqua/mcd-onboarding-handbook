"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Check, Maximize, Minimize } from "lucide-react"
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = "text" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const codeRef = useRef<HTMLElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  
  // Initialize syntax highlighting
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
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

  return (
    <div 
      className={`relative group rounded-xl overflow-hidden border border-mcd-gold/30 bg-gradient-to-br from-mcd-dark/90 to-mcd-darkest shadow-xl transition-all duration-300 ${
        expanded ? "fixed inset-4 md:inset-16 z-50 backdrop-blur-sm" : ""
      }`}
    >
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-mcd-gold/10 via-mcd-gold/5 to-transparent px-4 py-2 flex items-center justify-between border-b border-mcd-gold/20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-sm font-medium text-mcd-gold/90 font-mono">
            {language}
          </span>
        </div>
        
        <div className="flex gap-2">
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
            <div className="absolute -top-8 right-0 bg-mcd-gold text-mcd-darkest text-xs px-2 py-1 rounded-md shadow-lg opacity-0 group-hover/copy:opacity-100 transition-opacity pointer-events-none">
              {copied ? "Copied!" : "Copy"}
            </div>
          </button>
        </div>
      </div>
      
      {/* Code container with gradient overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-mcd-gold/5 via-transparent to-mcd-gold/5 pointer-events-none"></div>
        
        <pre 
          ref={preRef}
          className={`p-4 overflow-x-auto font-mono text-sm ${
            expanded ? "max-h-[calc(100vh-8rem)]" : "max-h-96"
          }`}
        >
          <code 
            ref={codeRef} 
            className={`language-${language} ${
              language !== 'text' ? 'line-numbers' : ''
            }`}
          >
            {code}
          </code>
        </pre>
      </div>
      
      {/* Floating copy confirmation */}
      {copied && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-mcd-gold/90 text-mcd-darkest px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out">
          <Check className="h-5 w-5" />
          <span className="font-medium">Copied to clipboard!</span>
        </div>
      )}
      
      {/* Line count badge */}
      {language !== 'text' && (
        <div className="absolute bottom-3 right-3 bg-mcd-dark/80 border border-mcd-gold/20 text-mcd-gold/70 text-xs px-2 py-1 rounded-md">
          {code.split('\n').length} lines
        </div>
      )}
    </div>
  )
}