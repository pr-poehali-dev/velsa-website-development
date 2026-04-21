import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				display: ['Bebas Neue', 'sans-serif'],
				heading: ['Oswald', 'sans-serif'],
				body: ['IBM Plex Sans', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				neon: '#D4FF00',
				'neon-dim': '#A8CC00',
				dark: '#0A0A0A',
				'dark-2': '#111111',
				'dark-3': '#1A1A1A',
				'dark-4': '#222222',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(40px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'slide-right': {
					from: { opacity: '0', transform: 'translateX(-60px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
				'speed-line': {
					from: { transform: 'translateX(-100%) scaleX(0)', opacity: '0' },
					to: { transform: 'translateX(0) scaleX(1)', opacity: '1' }
				},
				'ticker': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-50%)' }
				},
				'pulse-neon': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(212,255,0,0.4)' },
					'50%': { boxShadow: '0 0 40px rgba(212,255,0,0.8), 0 0 80px rgba(212,255,0,0.3)' }
				},
				'shimmer': {
					from: { backgroundPosition: '-200% center' },
					to: { backgroundPosition: '200% center' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 0.7s ease-out forwards',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'slide-right': 'slide-right 0.7s ease-out forwards',
				'speed-line': 'speed-line 0.8s ease-out forwards',
				'ticker': 'ticker 25s linear infinite',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'shimmer': 'shimmer 3s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
