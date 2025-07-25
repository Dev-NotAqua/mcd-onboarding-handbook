"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = "text" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="relative group">
      <div className="bg-mcd-dark rounded-lg border border-mcd-gold/20 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-mcd-gold/10 border-b border-mcd-gold/20">
          <span className="text-sm font-medium text-mcd-gold">{language}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1 rounded-md bg-mcd-gold/20 hover:bg-mcd-gold/30 text-mcd-gold text-sm transition-colors duration-200"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-gray-100 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  )
}
