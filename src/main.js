// #region Imports

// For creating the app
import { createApp } from "vue"

// For creating stores
import { createPinia } from "pinia"

// The main app component
import App from "@src/App.vue"

// The router
import router from "@src/router"

// #endregion Imports



// Create the app
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")