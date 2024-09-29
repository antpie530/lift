import { eq, max } from "drizzle-orm";
import { db } from "@/db/db";
import { completedExercise } from "../schema";
import { CreateCompletedExerciseData, ReturnedDataFromCreateCompletedExercise } from "./types";

const getMaxOrderNumber = async (workoutId: number) => await db
    .select({ value: max(completedExercise.orderNumber) })
    .from(completedExercise)
    .where(eq(completedExercise.workoutId, workoutId));

export const createCompletedExercise = async (data: CreateCompletedExerciseData): Promise<ReturnedDataFromCreateCompletedExercise>=> {
    const maxOrderNumber = await getMaxOrderNumber(data.workoutId);
    console.log(maxOrderNumber);
    const orderNumber = maxOrderNumber[0]?.value ?? 1;
    console.log(orderNumber);

    const [newExercise] = await db.insert(completedExercise)
        .values({
            workoutId: data.workoutId,
            exerciseId: data.exerciseId,
            notes: "",
            orderNumber: orderNumber
        })
        .returning()
    
    const exercise: ReturnedDataFromCreateCompletedExercise = {
        id: newExercise.id,
        exerciseId: data.exerciseId,
        name: data.name,
        schema: data.schema,
        sets: []
    }

    return exercise;
}