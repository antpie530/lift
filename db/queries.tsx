import { eq } from "drizzle-orm"
import { db } from "./db";
import { exercise } from "./schema";

export const getAllExercises = async () => await db.select().from(exercise).where(eq(exercise.hidden, false));