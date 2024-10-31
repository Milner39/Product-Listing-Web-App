// #region Imports

import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import { tables } from "./schemas"

// #endregion Imports


// #region Utils
const createDbClient = (db = null) => {
    return drizzle(
        createClient({ url: "file:./.db" }),
        { schema: { ...tables } }
    )
}
// #endregion Utils



// #region Exports
const dbClient = createDbClient()

const dbUtils = {
    createDbClient,
    dbClient,
    tables
}

export default dbUtils

export { createDbClient, dbClient, tables }
// #endregion Exports