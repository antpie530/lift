import { asc, eq } from "drizzle-orm"
import { db } from "./db";
import { exercise, ExerciseInsert } from "./schema";

export const getAllExercises = async () => await db.select().from(exercise).where(eq(exercise.hidden, false)).orderBy(asc(exercise.name));

export const createExercise = async (data: ExerciseInsert) => await db.insert(exercise).values(data);

export const hideExercise = async (id: number) => await db.update(exercise).set({ hidden: true }).where(eq(exercise.id, id));

export const getExercise = async (id: number) => await db.select().from(exercise).where(eq(exercise.id, id));

export const editExercise = async (id: number, name: string, description: string | undefined | null) => await db.update(exercise).set({ name: name, description: description}).where(eq(exercise.id, id));