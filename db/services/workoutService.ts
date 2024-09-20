import { convertTimeToMs } from "@/utils/timeUtils";
import { db } from "../db";
import { 
    completedExercise,
    schemaRepsOnly,
    schemaTimeOnly,
    schemaWeightReps,
    schemaWeightThrows,
    workout 
} from "../schema";
import { RepsOnly, SubmittedWorkout, TimeOnly, TimeOnlyUnits, WeightReps, WeightRepsUnits, WeightThrows, WeightThrowUnits } from "@/types/commonTypes";
import convertWeightToGrams from "@/utils/conversions/weightConversions";

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
            const [newCompletedExercise] = await tsx.insert(completedExercise).values({
                workoutId: newWorkout.id,
                exerciseId: exercises[i].id,
                notes: exercises[i].notes,
                orderNumber: i + 1
            }).returning({ id: completedExercise.id });

            const sets = exercises[i].sets;
            const schema = exercises[i].schema;
            
            if (schema == "Reps Only") {
                for (let j = 0; j < sets.length; j++) {
                    const set = sets[j] as RepsOnly

                    await tsx.insert(schemaRepsOnly).values({
                        completedExerciseId: newCompletedExercise.id,
                        reps: set.reps ?? 0,
                        setNumber: j + 1
                    });
                }
            } else if (schema === "Time Only") {
                const schemaUnits = exercises[i].schemaUnits as TimeOnlyUnits;

                for (let j = 0; j < sets.length; j++) {
                    const set = sets[j] as TimeOnly;
                    const ms = convertTimeToMs(set.time, schemaUnits.timeUnit);

                    await tsx.insert(schemaTimeOnly).values({
                        completedExerciseId: newCompletedExercise.id,
                        time: ms,
                        setNumber: j + 1
                    });
                }
            } else if (schema === "Weight Reps") {
                const schemaUnits = exercises[i].schemaUnits as WeightRepsUnits;

                for (let j = 0; j < sets.length; j++) {
                    const set = sets[j] as WeightReps;
                    const g = convertWeightToGrams(set.weight ?? 0, schemaUnits.weightUnit);

                    await tsx.insert(schemaWeightReps).values({
                        completedExerciseId: newCompletedExercise.id,
                        weight: g,
                        reps: set.reps ?? 0,
                        setNumber: j + 1
                    });
                }

            } else if (schema === "Weight Throws") {
                const schemaUnits = exercises[i].schemaUnits as WeightThrowUnits;

                for (let j = 0; j < sets.length; j++) {
                    const set = sets[j] as WeightThrows;
                    const g = convertWeightToGrams(set.weight ?? 0, schemaUnits.weightUnit);

                    await tsx.insert(schemaWeightThrows).values({
                        completedExerciseId: newCompletedExercise.id,
                        weight: g,
                        throws: set.throws ?? 0,
                        setNumber: j + 1
                    });
                }
            }
        }
    })
}