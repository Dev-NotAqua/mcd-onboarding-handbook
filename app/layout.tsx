import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MC&D Onboarding Handbook - Marshall, Carter, and Darke Ltd.",
  description: "Comprehensive onboarding guide for new employees at Marshall, Carter, and Darke Ltd. Learn about company hierarchy, procedures, and protocols.",
  keywords: "MC&D, Marshall Carter Darke, onboarding, handbook, employee guide, company procedures",
  authors: [{ name: "Marshall, Carter, and Darke Ltd." }],
  creator: "MC&D HR Department",
  publisher: "Marshall, Carter, and Darke Ltd.",
  robots: "index, follow",
  generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="mcd-handbook-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
