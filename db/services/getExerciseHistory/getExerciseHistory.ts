import { eq } from "drizzle-orm";

import { db } from "@/db/db";

import { ExerciseHistoryWithSchema } from "./types";
import { groupByWorkout } from "./utils";
import {
    completedExercise,
    exercise,
    schemaRepsOnly,
    schemaTimeOnly,
    schemaWeightReps,
    schemaWeightThrows,
    workout,
} from "../../schema";

export const getExerciseHistory = async (
    id: number,
): Promise<ExerciseHistoryWithSchema> => {
    const query = await db.select().from(exercise).where(eq(exercise.id, id));

    if (query.length === 0) {
        throw new Error(`Exercise with id: ${id} not found`);
    }

    const exerciseObject = query[0];
    let data;

    if (exerciseObject.schema === "Reps Only") {
        data = await db
            .select({
                reps: schemaRepsOnly.reps,
                setNumber: schemaRepsOnly.setNumber,
                timestamp: workout.startTimestamp,
            })
            .from(schemaRepsOnly)
            .innerJoin(
                completedExercise,
                eq(schemaRepsOnly.completedExerciseId, completedExercise.id),
            )
            .innerJoin(workout, eq(completedExercise.workoutId, workout.id))
            .innerJoin(exercise, eq(completedExercise.exerciseId, exercise.id))
            .where(eq(exercise.id, id));
    } else if (exerciseObject.schema === "Time Only") {
        data = await db
            .select({
                time: schemaTimeOnly.time,
                setNumber: schemaTimeOnly.setNumber,
                timestamp: workout.startTimestamp,
            })
            .from(schemaTimeOnly)
            .innerJoin(
                completedExercise,
                eq(schemaTimeOnly.completedExerciseId, completedExercise.id),
            )
            .innerJoin(workout, eq(completedExercise.workoutId, workout.id))
            .innerJoin(exercise, eq(completedExercise.exerciseId, exercise.id))
            .where(eq(exercise.id, id));
    } else if (exerciseObject.schema === "Weight Reps") {
        data = await db
            .select({
                weight: schemaWeightReps.weight,
                reps: schemaWeightReps.reps,
                setNumber: schemaWeightReps.setNumber,
                timestamp: workout.startTimestamp,
            })
            .from(schemaWeightReps)
            .innerJoin(
                completedExercise,
                eq(schemaWeightReps.completedExerciseId, completedExercise.id),
            )
            .innerJoin(workout, eq(completedExercise.workoutId, workout.id))
            .innerJoin(exercise, eq(completedExercise.exerciseId, exercise.id))
            .where(eq(exercise.id, id));
    } else {
        data = await db
            .select({
                weight: schemaWeightThrows.weight,
                throws: schemaWeightThrows.throws,
                setNumber: schemaWeightThrows.setNumber,
                timestamp: workout.startTimestamp,
            })
            .from(schemaWeightThrows)
            .innerJoin(
                completedExercise,
                eq(
                    schemaWeightThrows.completedExerciseId,
                    completedExercise.id,
                ),
            )
            .innerJoin(workout, eq(completedExercise.workoutId, workout.id))
            .innerJoin(exercise, eq(completedExercise.exerciseId, exercise.id))
            .where(eq(exercise.id, id));
    }

    const processedData = groupByWorkout(data);
    return {
        schema: exerciseObject.schema,
        history: processedData,
    };
};
