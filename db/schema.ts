import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const exercise = sqliteTable("exercise", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    schema: text("schema", { enum: ["Weight Reps", "Reps Only", "Weight Throws", "Time Only"]}).notNull(),
    description: text("description")
});