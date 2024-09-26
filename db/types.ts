export type UpdateWorkoutData = {
    id: number;
    name: string;
    notes: string | null;
}

export type UpdateCompletedExerciseNotesData = {
    id: number;
    notes: string | null;
}