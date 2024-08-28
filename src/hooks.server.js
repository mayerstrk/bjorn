// src/hooks.server.js
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event, {
		preload: ({ type, path }) => {
			// Preload font files from the static/fonts directory
			if (
				type === 'asset' &&
				path.includes('fonts') &&
				path.endsWith('.woff2')
			) {
				return true;
			}
			// Default preloading for JS and CSS files
			return type === 'js' || type === 'css';
		}
	});

	return response;
}
