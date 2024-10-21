// #region Imports

// For creating the router
import { createRouter, createWebHistory } from "vue-router"

// Import routes
import routes from "./routes"

// #endregion Imports



// Create the router
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes
})

export default router