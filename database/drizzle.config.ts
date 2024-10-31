export default {
    dialect: "sqlite",
    dbCredentials: {
        url: "database/.db",
    },
    schema: "database/schemas/**/schema.ts",
    out: "database/drizzle.temp/out",
    migrations: {
        prefix: "timestamp",
    }
}