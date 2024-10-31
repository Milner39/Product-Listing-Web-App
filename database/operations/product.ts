// #region Imports

import { dbClient, tables } from "../dbUtils"

// #endregion Imports



// #region Types

type Insert = typeof tables.product.$inferInsert
type Select = typeof tables.product.$inferSelect

// #endregion Types


// #region Operations

const create = async (fieldValues: Insert) => {
    try {
        const entry: Select = (await dbClient.insert(tables.product).values(fieldValues).returning())[0]
    } catch (error) {
        console.error(`At: ${import.meta.url}:`)
        console.error(error instanceof Error ? error.stack : error)
    }
}

// #endregion Operations