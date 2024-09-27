export type UpdateWorkoutData = {
    id: number;
    name: string;
    notes: string | null;
}

export type UpdateCompletedExerciseNotesData = {
    id: number;
    notes: string | null;
}

export type UpdateRepsOnlySetData = {
    id: number;
    reps: number;
}

export type UpdateTimeOnlySetData = {
    id: number;
    time: number;
}

export type UpdateWeightRepsSetData = {
    id: number;
    weight: number;
    reps: number;
}

export type UpdateWeightThrowsSetData = {
    id: number;
    weight: number;
    throws: number;
}