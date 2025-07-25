import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
/* Core Identity */
  "mcd-gold":         "#FFD700",  /* classic brand gold */
  "mcd-gold-light":   "#FFED4E",  /* highlight / hover */
  "mcd-gold-dark":    "#B8860B",  /* pressed / borders */

  /* Royal Purple Range */
  "mcd-purple":       "#663399",  /* primary purple */
  "mcd-purple-light": "#9B6DFF",  /* accents / links */
  "mcd-purple-dark":  "#3D1C6B",  /* headings / footer */

  /* Neutral Spectrum */
  "mcd-dark":         "#1A1A1A",  /* almost-black */
  "mcd-gray":         "#2F2F2F",  /* mid-gray */
  "mcd-gray-light":   "#4A4A4A",  /* subtle borders */
  "mcd-silver":       "#D3D3D3",  /* body text on dark */
  "mcd-white":        "#FFFFFF",  /* inverse text / cards */

  /* Utility */
  "mcd-success":      "#00E676",  /* positive feedback */
  "mcd-error":        "#FF5252",  /* alerts / errors */
  "mcd-warning":      "#FF9800",  /* warnings / CTAs */
  "mcd-info":         "#2196F3",  /* informational */

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}

export default config
