import { int, text, sqliteTable } from "drizzle-orm/sqlite-core"

export default sqliteTable("product", {
    id: int("id").primaryKey({ autoIncrement: true }),
    data: text("data").notNull()
})