import type { Config } from 'tailwindcss';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mplus: ['mplus', 'sans-serif'] // Ensure this matches your CSS @font-face definitions
			},
			animation: {
				'spin-fast': 'spin 0.2s linear infinite'
			}
		}
	},
	plugins: []
} satisfies Config;

export default config;
