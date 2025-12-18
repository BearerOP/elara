import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		keyframes: {
  			shine: {
  				'0%': {
  					'background-position': '100%'
  				},
  				'100%': {
  					'background-position': '-100%'
  				}
  			}
  		},
  		animation: {
  			shine: 'shine 5s linear infinite'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			text: {
  				primary: '#FFFFFF',
  				secondary: 'rgba(255, 255, 255, 0.84)',
  				tertiary: 'rgba(255, 255, 255, 0.72)',
  				quaternary: 'rgba(255, 255, 255, 0.64)',
  				muted: 'rgba(255, 255, 255, 0.48)',
  				disabled: 'rgba(255, 255, 255, 0.4)'
  			},
  			border: 'hsl(var(--border))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			logo: [
  				'Transcity',
  				'sans-serif'
  			],
  			body: [
  				'var(--font-outfit)'
  			]
  		},
  		fontSize: {
  			'logo-lg': [
  				'64px',
  				{
  					lineHeight: '1.076',
  					letterSpacing: '0'
  				}
  			],
  			'logo-md': [
  				'40px',
  				{
  					lineHeight: '1.076',
  					letterSpacing: '0'
  				}
  			],
  			'logo-sm': [
  				'52.68px',
  				{
  					lineHeight: '1.076',
  					letterSpacing: '0'
  				}
  			]
  		},
  		borderRadius: {
  			card: '16px',
  			input: '32px',
  			button: '12px',
  			modal: '24px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'gradient-border': 'linear-gradient(173deg, rgba(213, 0, 72, 1) 1%, rgba(190, 114, 129, 1) 40%, rgba(77, 78, 134, 1) 79%)',
  			'gradient-text': 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0.4) 100%)',
  			'gradient-text-alt': 'linear-gradient(168deg, rgba(213, 0, 72, 1) 2%, rgba(190, 114, 129, 1) 51%, rgba(77, 78, 134, 1) 100%)',
  			'gradient-ellipse': 'linear-gradient(180deg, rgba(239, 0, 85, 1) 0%, rgba(194, 113, 123, 1) 51%, rgba(46, 45, 100, 1) 100%)',
  			'gradient-modal': 'linear-gradient(180deg, rgba(22, 23, 36, 1) 0%, rgba(22, 22, 22, 1) 37%)'
  		},
  		backdropBlur: {
  			input: '100px',
  			modal: '16px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config

