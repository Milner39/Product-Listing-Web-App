// #region Imports

import { dbClient, tables } from "../dbUtils.ts"
import { log as logError } from "../../utils/errorUtils.ts"

// #endregion Imports



// #region Types

type Insert = typeof tables.product.$inferInsert
type Select = typeof tables.product.$inferSelect

// #endregion Types


// #region Operations

const create = async (fieldValues: Insert) => {
    try {
        const entry: Select = (await dbClient.insert(tables.product).values(fieldValues).returning())[0]
        return entry
    } catch (error) {
        logError(error, import.meta.url)
        return null
    }
}


const read = async (fieldFilters?: { [key in keyof Select]?: unknown } ) => {
    try {
        const entries = await dbClient.query.product.findMany({
            where: (entry, { and, eq }) => and(
                // For every key in field filters
                ...Object.entries(fieldFilters || []).map(([key, value]) => {
                    // Add an equals constrain to the query
                    return eq(entry[key], value)
                })

                /*
                    eq(entry.id, fieldFilters.id),
                    eq(entry.brand, fieldsFilter.brand)
                    etc...
                */
            )
        })
        return entries

    } catch (error) {
        logError(error, import.meta.url)
        return null
    }
}


const deleteAll = async () => {
    try {
        await dbClient.delete(tables.product)
    } catch (error) {
        logError(error, import.meta.url)
    }
}

// #endregion Operations



// #region Exports

const operations = {
    create,
    read,
    deleteAll
}

export default operations

export { create, read, deleteAll }

// #endregion Exports