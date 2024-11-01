// #region Imports

import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import { tables } from "./schemas/index.ts"

// #endregion Imports


// #region Utils
const createDbClient = () => {
    return drizzle(
        createClient({ url: "file:database/.db" }),
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