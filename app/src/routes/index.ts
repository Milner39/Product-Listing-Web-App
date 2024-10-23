import type { NuxtPage } from "nuxt/schema"

/*
	Define routes.
	Do it this way because:
	- Doesn't require a layouts in separate directory.
	- Nested layouts are more intuitive.
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