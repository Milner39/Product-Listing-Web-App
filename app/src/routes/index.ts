// #region Imports

import fs from "node:fs"
import { fileURLToPath } from "node:url"

import type { NuxtPage } from "nuxt/schema"

// #endregion Imports



// Array containing all of the routes generated from the directory structure
const routes = [
	{
		path: "/",
		children: []
	}
] satisfies NuxtPage[]

// Record containing the reference to the route of each layout group
const groups: {[key: string]: NuxtPage[]} = {
	none: routes[0].children
}

/* 
	Array containing each part of a route, e.g: ["/products","/[id]"]
	To keep track of the path matches during recursion
*/
const routeURL: string[] = []


// Regexs
const pageVueRegex = /^page(@(\w+))?\.vue$/ // "page.vue", "page@.vue", "page@*.vue"
// [...] folder
const layoutGroupDirRegex = /^\([^.\n\[\]]+[^.\n[\]]\)$/ // (...) folder
const regularDirRegex = /^(?![_\[(])[^.\n]+[^)\].]$/ // regular folder (ignore "_folderName")


// Subroutine to get the names of all the files and directories in a directory
const getFileAndDirNamesInDirectory = (path: string) => {
	return fs.readdirSync(path)
}


// Main recursive subroutine
const getRoutes = (dirURL: URL, route: NuxtPage[]) => {

	/* The only relevant files in the routes dir are:
		- layout.vue: defines a layout so `children` list must be created
		- page.vue: defines a page, could be "page@main" so be careful handling layout groups
		- normal folders: defines a route
		- [...] folder: defines a dynamic route
		- (...) folders: defines a layout group
		- (page/layout).(server.ts/ts) files coming later
	*/
	const filesAndDirs = getFileAndDirNamesInDirectory(fileURLToPath(dirURL))



	// layout.vue must be checked first since it affects how "page.vue" files are handled

	// Keeps track of if there was a layout this route
	let layoutThisRoute = false 

	// Get index of layout file so it can be removed from Array
	const layoutIndex = filesAndDirs.indexOf("layout.vue")

	if (layoutIndex > -1) {
		// Directory contains a "layout.vue" file

		// Add route
		route.push({
			path: "",
			file: fileURLToPath(new URL("./layout.vue", dirURL)),
			children: []
		})

		layoutThisRoute = true
		
		// Remove from files Array so its not iterated over
		filesAndDirs.splice(layoutIndex, 1)
	}



	// Iterate over rest of files and directories
	for (const fileOrDir of filesAndDirs) {

		// "page.vue", "page@.vue", "page@*.vue"
		const pageVueRegexResult = fileOrDir.match(pageVueRegex)
		if (pageVueRegexResult) {
			// File is a "page.vue", "page@.vue", "page@*.vue" file

			if (pageVueRegexResult[1]) {
				// File is a "page@.vue", "page@*.vue" file
				// TODO: TEST THIS WORKS

				// Get the part between "@" and ".vue"
				const layoutGroup = pageVueRegexResult[2]
				
				// Add route, default to root layout if "page@.vue" file
				groups[layoutGroup || "none"].push({
					path: routeURL.join("/"),
					file: fileURLToPath(new URL(`./${fileOrDir}`, dirURL))
				})
			} 

			// File is a "page.vue" file
			else if (layoutThisRoute) {
				// Add route
				// @ts-ignore: Object is possibly 'undefined'
				route[route.length -1].children.push({
					path: "",
					file: fileURLToPath(new URL(`./${fileOrDir}`, dirURL))
				})
			} 
			else {
				// Add route
				route.push({
					path: "",
					file: fileURLToPath(new URL(`./${fileOrDir}`, dirURL))
				})
			}
		}


		// [...] folder
		// TODO: Implement dynamic routes


		// (...) folder
		else if (fileOrDir.match(layoutGroupDirRegex)) {
			// Dir is a layout group folder
			
			if (layoutThisRoute) {

				// Add route
				// @ts-ignore: Object is possibly 'undefined'
				const childrenCount = route[route.length -1].children.push({
					path: "",
					children: []
				})

				// Add layout group
				// @ts-ignore: Object is possibly 'undefined'
				groups[fileOrDir] = route[route.length -1].children[childrenCount -1].children || []
			}
			else {

				// Add route
				route.push({
					path: "",
					children: []
				})

				// Add layout group
				groups[fileOrDir] = route[route.length -1].children || []
			}

			// Recurse
			getRoutes(
				new URL(`./${fileOrDir}/`, dirURL),
				groups[fileOrDir]
			)
		}


		// Regular folder
		else if (fileOrDir.match(regularDirRegex)) {
			// Dir is a regular folder

			// Add route path
			routeURL.push(fileOrDir)


			if (layoutThisRoute) {
				// Add route
				route[route.length -1].children?.push({
					path: `${fileOrDir}`,
					children: []
				})
			}
			else {
				// Add route
				route.push({
					path: `${fileOrDir}`,
					children: []
				})
			}

			const lastItemInRoute = route[route.length -1]
			
			// Recurse
			getRoutes(
				new URL(`./${fileOrDir}/`, dirURL), 
				layoutThisRoute ? 
					// @ts-ignore: Object is possibly 'undefined'
					lastItemInRoute.children[lastItemInRoute.children.length -1].children || [] :
					lastItemInRoute.children || []
			)

			// Remove route path
			routeURL.pop()
		}
	}
}

// Get current directory
const routesDirURL = new URL("./", import.meta.url)

// Get routes
getRoutes(routesDirURL, routes[0].children)

// Export routes
export default routes