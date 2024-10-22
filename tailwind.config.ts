import type { Config } from 'tailwindcss';

const config = {
	darkMode: 'selector',
	lightMode: 'selector',
	content: ['./app.html', './src/**/*.{html,js,svelte,ts}'],
	future: {
		hoverOnlyWhenSupported: true
	},
	theme: {
		extend: {
			colors: {
				lavender: {
					'50': '#f7f7fd',
					'100': '#eeeefb',
					'200': '#ddddf8',
					'300': '#cac9f3',
					'400': '#ada8eb',
					'500': '#978ce3',
					'600': '#8370d7',
					'700': '#6c55c3',
					'800': '#5740b0',
					'900': '#47348e',
					'950': '#2a1f5b'
				},
				accent: {
					1: 'hsl(var(--color-accent1) / <alpha-value>)',
					2: 'hsl(var(--color-accent2) / <alpha-value>)',
					3: 'hsl(var(--color-accent3) / <alpha-value>)',
					4: 'hsl(var(--color-accent4) / <alpha-value>)'
				},
				bkg: {
					1: 'hsl(var(--color-bkg1) / <alpha-value>)',
					2: 'hsl(var(--color-bkg2) / <alpha-value>)',
					3: 'hsl(var(--color-bkg3) / <alpha-value>)'
				},
				content: {
					1: 'hsl(var(--color-content1) / <alpha-value>)',
					2: 'hsl(var(--color-content2) / <alpha-value>)',
					3: 'hsl(var(--color-content3) / <alpha-value>)'
				}
			},
			willChange: {
				blur: 'backdrop-blur'
			},
			animation: {
				'spin-slower': 'spin 35s ease infinite',
				'spin-slow': 'spin 25s ease-in-out infinite reverse',
				'spin-fast': 'spin 0.2s linear infinite',
				'fade-in-up': 'fade-in-up 1s ease-out forwards',
				'fade-in': 'fade-in 1s ease forwards',
				'ping-slower': 'ping 5s ease infinite'
			},
			fontFamily: {
				mplus: ['mplus', 'sans-serif'],
				inter: ['inter', 'sans-serif'],
				poppins: ['poppins', 'sans-serif']
			},
			keyframes: {
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(40%)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			}
		}
	},
	plugins: []
} satisfies Config;

export default config;
