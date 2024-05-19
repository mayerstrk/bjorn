import type { Config } from 'tailwindcss';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mplus: ['mplus', 'sans-serif'] // Ensure this matches your CSS @font-face definitions
			}
		}
	},
	plugins: []
} satisfies Config;

export default config;
