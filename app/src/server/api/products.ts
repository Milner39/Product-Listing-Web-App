import { defineEventHandler } from "h3"

export default defineEventHandler(async (event) => {
    const response = await fetch("https://dummyjson.com/products")
    const responseData = await response.json()

    return responseData
})