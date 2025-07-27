/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
        // WAIDH specific colors
        steel: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D',
          600: '#495057',
          700: '#343A40',
          800: '#2C3E50',
          900: '#212529'
        },
        rust: {
          500: '#8B4513',
          600: '#704214',
          700: '#5D3A1A'
        },
        // The 5 Aspects
        aspect: {
          'arbeiter': '#CD7F32',
          'krieger': '#8B0000', 
          'taenzer': '#228B22',
          'heiler': '#4682B4',
          'denker': '#4B0082'
        },
        // Magic
        mana: {
          100: '#E0FFFF',
          200: '#B0E0E6',
          300: '#87CEEB'
        },
        wandelholz: '#556B2F',
        platin: '#E5E4E2'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        medieval: ["Cinzel", "serif"],
        display: ['Cinzel', 'serif'],
        body: ['Crimson Text', 'serif'],
        mono: ['Fira Code', 'monospace']
      },
      boxShadow: {
        'parchment': 'inset 0 2px 4px rgba(139,69,19,0.1)',
        'steel': '0 2px 4px rgba(52,58,64,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'engraved': 'inset 0 2px 4px rgba(0,0,0,0.3)'
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
}