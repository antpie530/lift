import { eq } from "drizzle-orm"
import { db } from "./db";
import { exercise, ExerciseInsert } from "./schema";

export const getAllExercises = async () => await db.select().from(exercise).where(eq(exercise.hidden, false));

export const createExercise = async (data: ExerciseInsert) => await db.insert(exercise).values(data);