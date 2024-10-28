import type { Nuxt, NuxtPage } from "nuxt/schema"

/*
	Define routes.
	Do it this way because:
	- Doesn't require layouts in separate directory.
	- Allows for nested layouts.
*/
const routes = [
	{
		path: "/",
		file: "~/routes/(main)/layout.vue",
		children: [
			{
				path: "",
				file: "~/routes/(main)/page.vue"
			},
			{
				path: "about",
				file: "~/routes/(main)/about/page.vue"
			},
			{
				path: "products",
				file: "~/routes/(main)/products/page.vue"
			}
		]
	}
] satisfies NuxtPage[]

export default routes

/* TODO:
	- Generate these routes from the routes directory.
	  Try copy how SvelteKit does it because it's pretty intuitive.
	  Just use file names to control weather a view is a layout or a page.
*/







import fs from "node:fs"
import { fileURLToPath } from "node:url"



const routes_ = [
	{
		path: "/",
		children: []
	}
] satisfies NuxtPage[]

const groups = {
	none: routes_[0]
}

const routeURL = ["/"] // to keep track of the path matches



const pageVueRegex = /^page(@(\w+))?\.vue$/ // "page.vue", "page@.vue", "page@main.vue"
// [...] folder
// (...) folder
const regularDirRegex = /^(\w+\.?)*\w+$/ // regular folder



const getFileNamesInDirectory = (path: string) => {
	return fs.readdirSync(path)
}


const getRoutes = (dirURL: URL, route: NuxtPage[]) => {
	const files = getFileNamesInDirectory(fileURLToPath(dirURL))

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
	const layoutIndex = files.indexOf("layout.vue")
	if (layoutIndex > -1) {
		// Directory contains a "layout.vue" file

		route.push({
			path: routeURL.join(""),
			file: fileURLToPath(new URL("./layout.vue", dirURL)),
			children: []
		})

		files.splice(layoutIndex, 1) // Remove from files array so its not iterated over
		layoutThisRoute = true
	}

	for (const file in files) {
		// "page.vue", "page@.vue", "page@main.vue"
		const pageVueRegexResult = file.match(pageVueRegex)
		if (pageVueRegexResult) {
			// File is a "page.vue", etc. file
			if (pageVueRegexResult[1]) {
				// File contains "@"

				const layoutGroup = pageVueRegexResult[2] // The part between "@" and ".vue"
				// @ts-ignore
				groups[layoutGroup | "none"].children.push({
					path: routeURL.join(""),
					file: fileURLToPath(new URL(`./${file}`, dirURL))
				})
			} 
			else if (layoutThisRoute) {
				route[route.length -1].children?.push({
					path: "",
					file: fileURLToPath(new URL(`./${file}`, dirURL))
				})
			} 
			else {
				route.push({
					path: routeURL.join("")
				})
			}
		}

		// [...] folder

		// (...) folder

		// Regular folder
		if (file.match(regularDirRegex)) {
			// File is a regular folder

			routeURL.push(file)

			// Need to route.push but check for layout

			getRoutes(new URL(`./${file}`, dirURL, ))
		}
	}
}

const routesPath = new URL("./", import.meta.url)

getRoutes(routesPath, routes_)

console.log(routes_)