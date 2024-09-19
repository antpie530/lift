import { db } from "../db";
import { completedExercise, workout } from "../schema";
import { SubmittedWorkout } from "@/types/commonTypes";

export const createWorkout = async (data: SubmittedWorkout) => {
    await db.transaction(async tsx => {
        const [newWorkout] = await tsx.insert(workout).values({
            name: data.name,
            notes: data.notes,
            startTimestamp: data.startTimestamp,
            duration: data.duration
        }).returning({ id: workout.id });

        const exercises = data.exercises

        for (let i = 0; i < exercises.length; i++) {
            const [newCompletedWorkout] = await tsx.insert(completedExercise).values({
                workoutId: newWorkout.id,
                exerciseId: exercises[i].id,
                notes: exercises[i].notes,
                orderNumber: i + 1
            }).returning({ id: completedExercise.id });

            const sets = exercises[i].sets
        }
    })
}