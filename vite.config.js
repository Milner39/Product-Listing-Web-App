// #region Imports

// For setting up file path aliases
import { fileURLToPath } from "node:url"

/*
	https://vitejs.dev/guide/using-plugins
	Import Vue plugin for Vite
*/
import vue from "@vitejs/plugin-vue"

// Import `dotenv` to get environment variables
import dotenv from "dotenv"

// #endregion Imports


// Load environment variables
dotenv.config()


/*
	https://vitejs.dev/config/
	Define Vite config
*/ 
/** @type {import("vite").UserConfig} */
const config = {
	plugins: [
		vue(),
	],


	// Development settings
	server: {
		// Allows devices on same network to access the site
		host: true,

		// Host on specified port during development
		port: process.env.DEV_PORT,
		strictPort: true
	},

	// Preview settings
	preview: {
		// Allows devices on same network to access the site
		host: true,

		// Host on specified port during preview
		port: process.env.PREV_PORT,
		strictPort: true
	},


	// Other settings
	resolve: {
		// Define aliases for paths
		alias: {
			"@src": fileURLToPath(new URL("./src", import.meta.url))
		},
	},
}

export default config