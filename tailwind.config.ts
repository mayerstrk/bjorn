import type { Config } from 'tailwindcss';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mplus: ['mplus', 'sans-serif'] // Ensure this matches your CSS @font-face definitions
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
			},
			animation: {
				'spin-fast': 'spin 0.2s linear infinite',
				'fade-in-up': 'fade-in-up 1s ease forwards',
				'fade-in': 'fade-in 1s ease forwards'
			}
		}
	},
	plugins: []
} satisfies Config;

export default config;
