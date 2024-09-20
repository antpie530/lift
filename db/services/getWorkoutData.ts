import { getAllWorkouts, getCompletedExerciseRepsOnly, getCompletedExerciseTimeOnly, getCompletedExerciseWeightReps, getCompletedExerciseWeightThrows, getWorkoutExercises } from "../queries";
import { Workouts } from "./types";

export const getAllWorkoutData = async () => {
    const data = await getAllWorkouts() as Workouts;

    for (let i = 0; i < data.length; i++) {
        const completedExercises = await getWorkoutExercises(data[i].id);
        data[i]["exercises"] = completedExercises

        for (let j = 0; j < completedExercises.length; j++) {
            let sets;

            if (completedExercises[j].schema === "Weight Reps") {
                sets = await getCompletedExerciseWeightReps(completedExercises[j].id);
            } else if (completedExercises[j].schema === "Weight Throws") {
                sets = await getCompletedExerciseWeightThrows(completedExercises[j].id);
            } else if (completedExercises[j].schema === "Reps Only") {
                sets = await getCompletedExerciseRepsOnly(completedExercises[j].id);
            } else if (completedExercises[j].schema === "Time Only") {
                sets = await getCompletedExerciseTimeOnly(completedExercises[j].id);
            }

            data[i]["exercises"][j]["sets"] = sets;
        }
    }

    return data
}