export default {
	plugins: {
		tailwindcss: {
			config: './tailwind.config.ts'
		},
		autoprefixer: {},
		...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
	}
};
