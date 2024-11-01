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
    deleteAll
}

export default operations

export { create, deleteAll }

// #endregion Exports