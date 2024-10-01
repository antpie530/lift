export type ExerciseSummary = {
    name: string;
    sets: number;
}

export interface CompletedWorkoutCardProps {
    name: string;
    startTimeStamp: number;
    duration: number;
    exercises: ExerciseSummary[];
}

export interface ExercisesProp {
    exercises: ExerciseSummary[];
}