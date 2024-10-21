// #region Imports

// For getting root path
import { fileURLToPath } from "node:url"

// Import Vite configuration
import viteConfig from "./vite.config"

// Subroutine to merge Vite and Vitest configurations
import { mergeConfig } from "vitest/config"

// #endregion Imports


// Define Vitest configuration
/** @type {{ test: import("vitest/node").UserConfig }} */
const vitestOverrides = {
	test: {
		root: fileURLToPath(new URL("./", import.meta.url)),
	}
}

// Merge Vite and Vitest configurations
const config = mergeConfig(
	viteConfig,
	vitestOverrides
)

export default config