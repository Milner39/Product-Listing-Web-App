// #region Imports

import { dbClient, tables } from "../dbUtils"

// #endregion Imports



// #region Operations

const create = async (fieldValues) => {
    try {
        const entry = (await dbClient.insert(tables.product).values(fieldValues).returning())[0]
    } catch (error) {
        console.error(`At: ${import.meta.url}:`)
        console.error(error instanceof Error ? error.stack : error)
    }
}

// #endregion Operations