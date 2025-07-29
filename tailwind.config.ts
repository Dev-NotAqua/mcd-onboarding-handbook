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
        // Your existing custom colors
        "mcd-gold": {
          light: "#FAD02C",
          DEFAULT: "#D4AF37",
          dark: "#B8860B",
        },
        "mcd-purple": {
          light: "#6A4C93",
          DEFAULT: "#462569",
          dark: "#2D1A44",
        },

        // Re-using the shadcn/ui theming structure
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
      animationDelay: {
        '0': '0ms',
        '150': '150ms',
        '300': '300ms',
      },
      animation: {
        'shake-page': 'shake-page 0.8s ease-in-out',
      },
      keyframes: {
        'shake-page': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate(-4px, -2px) rotate(-0.8deg)' },
          '20%, 40%, 60%, 80%': { transform: 'translate(4px, 2px) rotate(0.8deg)' },
          '5%, 25%, 45%, 65%, 85%': { transform: 'translate(-2px, 3px) rotate(0.5deg)' },
          '15%, 35%, 55%, 75%, 95%': { transform: 'translate(3px, -2px) rotate(-0.6deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
