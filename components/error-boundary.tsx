"use client"

import React from "react"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}



interface DefaultErrorFallbackProps {
  error?: Error
  resetError: () => void
}

function DefaultErrorFallback({ error, resetError }: DefaultErrorFallbackProps) {
  const [showDetails, setShowDetails] = useState(false)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4" role="alert" aria-live="assertive">
      <div className="max-w-md w-full bg-card rounded-xl border border-destructive/20 p-6 shadow-lg text-center space-y-4">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-destructive" aria-hidden="true" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Oops! Something went wrong</h2>
          <p className="text-sm text-muted-foreground">
            We encountered an unexpected error while loading the handbook. Don't worry - your data is safe.
          </p>
        </div>

        {error && (
          <div className="text-left">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline focus:outline-none focus:ring-2 focus:ring-mcd-gold focus:ring-offset-2 rounded"
              aria-expanded={showDetails}
              aria-controls="error-details"
            >
              {showDetails ? 'Hide' : 'Show'} error details
            </button>
            {showDetails && (
              <div id="error-details" className="mt-2">
                <pre className="text-xs bg-muted p-3 rounded border overflow-auto max-h-32 text-left">
                  {error.message}
                </pre>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={resetError}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-mcd-gold to-yellow-400 text-black rounded-lg hover:from-yellow-400 hover:to-mcd-gold transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mcd-gold focus:ring-offset-2 shadow-lg hover:shadow-xl"
            aria-label="Try to recover from the error"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-muted-foreground focus:ring-offset-2"
            aria-label="Refresh the entire page"
          >
            Refresh Page
          </button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          If this problem persists, please contact the MC&D IT department.
        </p>
      </div>
    </div>
  )
}
