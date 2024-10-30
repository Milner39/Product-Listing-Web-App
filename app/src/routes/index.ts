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

// 
const routeURL: string[] = [] // to keep track of the path matches



const pageVueRegex = /^page(@(\w+))?\.vue$/ // "page.vue", "page@.vue", "page@main.vue"
// [...] folder
const layoutGroupDirRegex = /^\([^.\n\[\]]+[^.\n[\]]\)$/ // (...) folder
const regularDirRegex = /^(?![_\[(])[^.\n]+[^)\].]$/ // regular folder



const getFileAndDirNamesInDirectory = (path: string) => {
	return fs.readdirSync(path)
}


const getRoutes = (dirURL: URL, route: NuxtPage[]) => {
	const filesAndDirs = getFileAndDirNamesInDirectory(fileURLToPath(dirURL))

	/* The only relevant files in the routes dir are:
		- layout.vue: defines a layout so `children` list must be created
		- page.vue: defines a page, could be "page@main" so be careful handling layouts
		- normal folders: defines a route
		- [...] folder: defines a dynamic route
		- (...) folders: defines a layout group
		- (page/layout).(server.ts/ts) files coming later
	*/


	// layout.vue must be checked first since it affects how "page.vue" files are handled
	let layoutThisRoute = false
	const layoutIndex = filesAndDirs.indexOf("layout.vue")
	if (layoutIndex > -1) {
		// Directory contains a "layout.vue" file

		route.push({
			path: "",
			file: fileURLToPath(new URL("./layout.vue", dirURL)),
			children: []
		})

		filesAndDirs.splice(layoutIndex, 1) // Remove from files array so its not iterated over
		layoutThisRoute = true
	}

	for (const fileOrDir of filesAndDirs) {
		// "page.vue", "page@.vue", "page@main.vue"
		const pageVueRegexResult = fileOrDir.match(pageVueRegex)
		if (pageVueRegexResult) {
			// File is a "page.vue", etc. file
			if (pageVueRegexResult[1]) {
				// File contains "@"

				const layoutGroup = pageVueRegexResult[2] // The part between "@" and ".vue"
				
				groups[layoutGroup || "none"].push({
					path: routeURL.join(""),
					file: fileURLToPath(new URL(`./${fileOrDir}`, dirURL))
				})
			} 
			else if (layoutThisRoute) {
				// @ts-ignore: Object is possibly 'undefined'
				route[route.length -1].children.push({
					path: "",
					file: fileURLToPath(new URL(`./${fileOrDir}`, dirURL))
				})
			} 
			else {
				route.push({
					path: "",
					file: fileURLToPath(new URL(`./${fileOrDir}`, dirURL))
				})
			}
		}

		// [...] folder

		// (...) folder
		else if (fileOrDir.match(layoutGroupDirRegex)) {
			// File is a layout group folder
			
			if (layoutThisRoute) {
				// @ts-ignore: Object is possibly 'undefined'
				const childrenCount = route[route.length -1].children.push({
					path: "",
					children: []
				})

				// @ts-ignore: Object is possibly 'undefined'
				groups[fileOrDir] = route[route.length -1].children[childrenCount -1].children || []
			}
			else {
				route.push({
					path: "",
					children: []
				})

				groups[fileOrDir] = route[route.length -1].children || []
			}

			getRoutes(
				new URL(`./${fileOrDir}/`, dirURL),
				groups[fileOrDir]
			)
		}

		// Regular folder
		else if (fileOrDir.match(regularDirRegex)) {
			// File is a regular folder

			routeURL.push(fileOrDir)

			if (layoutThisRoute) {
				route[route.length -1].children?.push({
					path: `${fileOrDir}`,
					children: []
				})
			}
			else {
				route.push({
					path: `${fileOrDir}`,
					children: []
				})
			}

			const lastItemInRoute = route[route.length -1]
			
			getRoutes(
				new URL(`./${fileOrDir}/`, dirURL), 
				layoutThisRoute ? 
					// @ts-ignore: Object is possibly 'undefined'
					lastItemInRoute.children[lastItemInRoute.children.length -1].children || [] :
					lastItemInRoute.children || []
			)

			routeURL.pop()
		}
	}
}

const routesPath = new URL("./", import.meta.url)

getRoutes(routesPath, routes[0].children)

export default routes