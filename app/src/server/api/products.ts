// #region Imports

import { defineEventHandler } from "h3" // Nuxt compiler would not auto import

import type { Product } from "types/product.d.ts"

// #endregion Imports


// Define event handler
export default defineEventHandler(async (event) => {
    // Get products from API
    const response = await fetch("https://dummyjson.com/products")

    // Expected response data structure
    type ResponseData = {
        limit: number,
        products: Product[],
        skip: number,
        total: number
    }

    // Get response data
    const responseData: ResponseData = await response.json()

    // Return response
    return responseData
})