import preprocess from 'svelte-preprocess';
import { uploadPlugin } from './src/lib/uploadPlugin.mjs';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({
        scss: {
            "prependData": "@import \"src/variables.scss\";"
        }
    })],

	kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte',
        files: {
			assets: 'static',
			hooks: 'src/hooks',
			lib: 'src/lib',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',
			template: 'src/app.html'
		},

        vite: {
            // The File Upload plugin
            plugins: [uploadPlugin],
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: "@import \"src/variables.scss\";"
                    }
                }
            }
        }
    }
};

export default config;
