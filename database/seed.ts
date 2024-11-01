// #region Imports

import productTable from "./operations/product.ts"
import { log as logError } from "../utils/errorUtils.ts"

import type { Product } from "../types/product.d.ts"

// #endregion Imports



// Delete all entries
await productTable.deleteAll()

// Get product data from API
const url = "https://dummyjson.com/products?limit=0"
try {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Could not get product data from API: ${response.status}`)
    }

    // Expected response data structure
    type ResponseData = {
        limit: number,
        products: Product[],
        skip: number,
        total: number
    }

    const responseData: ResponseData = await response.json()
    for (const product of responseData.products) {
        // @ts-ignore
        product.tags = JSON.stringify(product.tags)
        // @ts-ignore
        product.dimensions = JSON.stringify(product.dimensions)
        // @ts-ignore
        product.reviews = JSON.stringify(product.reviews)
        // @ts-ignore
        product.images = JSON.stringify(product.images)
        // @ts-ignore
        product.meta = JSON.stringify(product.meta)

        productTable.create(product)
    }

} catch (error) {
    logError(error, import.meta.url)
}