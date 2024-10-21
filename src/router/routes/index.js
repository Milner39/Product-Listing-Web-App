/** @type {import("vue-router").RouteRecordRaw} */
// Define routes
const routes = [
    {
        path: "/",
        component: () => import("./(main)/layout.vue"),
        children: [
            {
               path: "",
               component: () => import("./(main)/page.vue")
            },
            {
                path: "about",
                component: () => import("./(main)/about/page.vue")
            }
        ]
    }
]

export default routes