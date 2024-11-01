// #region Imports

import { defineEventHandler } from "h3" // Nuxt compiler would not auto import
import productTable from "~~/database/operations/product"

// #endregion Imports


// Define event handler
export default defineEventHandler(async (event) => {
    // Get request body
    const requestQueryParams = getQuery(event)

    
    if (typeof requestQueryParams.id !== "undefined" &&  requestQueryParams.id !== null) {

        // Parse product id
        const productId = parseInt(String(requestQueryParams.id))

        // If product id is not a number
        if (isNaN(productId)) {
            // Return a custom response
            event.node.res.statusCode = 400
            event.node.res.statusMessage = "Invalid Product ID"
            event.node.res.end()
            return
        }


        // Get single product from db using id in query
        const productsResponse = await productTable.read({ id: productId })

        // If db query failed
        if (productsResponse === null) {
            // Return a custom response
            event.node.res.statusCode = 500
            event.node.res.statusMessage = "Server Error"
            event.node.res.end()
            return
        }

        // If no product found
        else if (productsResponse.length < 0) {
            // Return a custom response
            event.node.res.statusCode = 404
            event.node.res.statusMessage = "Not Found"
            event.node.res.end()
            return
        }

        // Return response
        return parseProduct(productsResponse[0])
    }
    
    
    // Get multiple products from db
    const productsResponse = await productTable.read()

    // If db query failed
    if (productsResponse === null) {
        // Return a custom response
        event.node.res.statusCode = 500
        event.node.res.statusMessage = "Server Error"
        event.node.res.end()
        return
    }


    // Return response
    return productsResponse.map(product => parseProduct(product))
})



/*
    At the moment, a flat-file database is being used.
    This is only because of the time constraint on this project
    but it means any Arrays must be stringified to be stored in
    the database. A relational database would make this obsolete,
    I just don't have the time.

    This subroutine will parse the stringified columns.
*/
const parseProduct = (product: any) => {
    product.tags = JSON.parse(product.tags)
    product.dimensions = JSON.parse(product.dimensions)
    product.reviews = JSON.parse(product.reviews)
    product.images = JSON.parse(product.images)
    product.meta = JSON.parse(product.meta)

    return product
}