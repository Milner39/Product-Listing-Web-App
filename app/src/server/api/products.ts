// #region Imports

import { defineEventHandler, readBody } from "h3" // Nuxt compiler would not auto import

import type { Product } from "types/product.d.ts"

// #endregion Imports


// Define event handler
export default defineEventHandler(async (event) => {
    // Get request body
    const requestQueryParams = getQuery(event)

    
    if (typeof requestQueryParams.id !== "undefined" &&  requestQueryParams.id !== null) {

        // Get single product from API
        const response = await fetch(`https://dummyjson.com/products/${requestQueryParams.id}`)

        // Get response data
        const responseData: Product = await response.json()

        // Return response
        return responseData
    }
    
    
    // Get multiple products from API
    const response = await fetch("https://dummyjson.com/products?limit=0")

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