// #region Imports

// Subroutine to get root path
import { fileURLToPath } from "node:url"

// Get routes
import routes from "./src/routes/index"

// Get environment variables
import dotenv from "dotenv"

// #endregion Imports


// Load environment variables
dotenv.config()


// Get the root path of the project and app
const appRoot = new URL("./", import.meta.url)
const projectRoot = new URL("../", appRoot)


// Define Nuxt configuration
export default defineNuxtConfig({
	// Ensure Nuxt/Nitro compatibility
	compatibilityDate: "2024-04-03",

	// Enable devtools
	devtools: { enabled: true },


	// App configuration
	app: {
		head: {
			title: "Product Lister",
			meta: [
				{ name: "description", content: "A product listing app" }
			],
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
			]
		}
	},


	// Directory configuration
	// Output directories
	rootDir: fileURLToPath(projectRoot),
	buildDir: fileURLToPath(new URL("./nuxt.temp/generated", appRoot)), // default: .nuxt
	analyzeDir: fileURLToPath(new URL("./nuxt.temp/stats", appRoot)), // default: .nuxt/analyze
	nitro: { output: {
			dir: fileURLToPath(new URL("./nuxt.temp/build", appRoot)), // default: .output
			// serverDir: fileURLToPath(new URL("./nuxt.temp/build/server", appRoot)), // default: .output/server
			// publicDir: fileURLToPath(new URL("./nuxt.temp/build/public", appRoot)), // default: .output/client
	}},
	// Output directories

	// Source directories
	srcDir: fileURLToPath(new URL("./src", appRoot)),
	dir: {
		app: "./", // default: app
		pages: "./routes", // default: pages
		public: "./public", // default: public
	},
	// Source directories
	// Directory configuration


	// Server configuration
	devServer: {
		port: Number(process.env.DEV_PORT)
	},
	// Server configuration

	
	/*
		Generated routes from the pages directory won't be used but
		if this is set to `false`, the app will not work...
		don't ask me why... Nuxt is weird.
	*/
	pages: true, // Controls whether Nuxt should generate routes from the pages directory


	//  Lifecycle hooks
	hooks: {
		// Set up routes
		"pages:extend" (pages) {
			console.log(pages)

			// Remove generate routes
			pages.splice(0, pages.length)

			// Add routes
			for (const route of routes) {
				pages.push(route)
			}

			console.log(pages)
		}
	}

	/* TODO:
		- Figure out how to enable strict port in Vite
		- Configure `nuxt preview` settings
	*/
})
