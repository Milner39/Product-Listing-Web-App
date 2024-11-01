import { int, real, text, sqliteTable } from "drizzle-orm/sqlite-core"

export default sqliteTable("product", {
    id: int("id").primaryKey({ autoIncrement: true }),
    title: text("title"),
    description: text("description"),
    category: text("category"),
    price: real("price"),
    discountPercentage: real("discountPercentage"),
    rating: real("rating"),
    stock: int("stock"),
    tags: text("tags", { mode: "json" }),
    brand: text("brand"),
    sku: text("sku"),
    weight: real("weight"),
    dimensions: text("dimensions", { mode: "json" }),
    warrantyInformation: text("warrantyInformation"),
    shippingInformation: text("shippingInformation"),
    availabilityStatus: text("availabilityStatus"),
    reviews: text("reviews", { mode: "json" }),
    returnPolicy: text("returnPolicy"),
    minimumOrderQuantity: int("minimumOrderQuantity"),
    thumbnail: text("thumbnail"),
    images: text("images", { mode: "json" }),
    meta: text("meta", { mode: "json" })
})