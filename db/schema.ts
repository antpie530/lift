import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod";

export const exercise = sqliteTable("exercise", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    schema: text("schema", { enum: ["Weight Reps", "Reps Only", "Weight Throws", "Time Only"]}).notNull(),
    description: text("description"),
    hidden: integer("hidden", { mode: "boolean"}).default(false)
});

export const workout = sqliteTable("workout", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    notes: text("notes"),
    startTimestamp: integer("startTimestamp").notNull(),
    duration: integer("duration").notNull(),
});

export const completedExercise = sqliteTable("completedExercise", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    workoutId: integer("workoutId").references(() => workout.id, { onDelete: "cascade" }),
    exerciseId: integer("exerciseId").references(() => exercise.id),
    notes: text("notes"),
    orderNumber: integer("orderNumber").notNull()
})

export const exerciseSelectSchema = createSelectSchema(exercise);
export const exerciseInsertSchema = createInsertSchema(exercise);

export type Exercise = z.infer<typeof exerciseSelectSchema>;
export type ExerciseInsert = z.infer<typeof exerciseInsertSchema>;