import type { Config } from 'tailwindcss';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'jetbrains-mono': ['JetBrainsMono', 'monospace']
			}
		}
	},
	plugins: []
} satisfies Config;

export default config;
