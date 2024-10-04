import { SchemaTypes } from "@/types/commonTypes";

export type WeightRepsSet = {
    id: number;
    weight: number;
    reps: number;
};

export type WeightThrowsSet = {
    id: number;
    weight: number;
    throws: number;
};

export type RepsOnlySet = {
    id: number;
    reps: number;
};

export type TimeOnlySet = {
    id: number;
    time: number;
};

export type SetType = WeightRepsSet | WeightThrowsSet | RepsOnlySet | TimeOnlySet;

export type Exercise = {
    id: number;
    exerciseId: number | null;
    name: string;
    notes: string | null;
    schema: SchemaTypes;
    sets: SetType[];
};

export type Workout = {
    id: number;
    name: string;
    notes: string | null;
    startTimestamp: number;
    duration: number;
    exercises: Exercise[]
};

export type Workouts = Workout[];

export interface DeleteSetFromEditData {
    schema: SchemaTypes;
    id: number
}

export interface CreateCompletedExerciseData {
    workoutId: number;
    exerciseId: number;
    name: string;
    schema: "Weight Reps" | "Reps Only" | "Weight Throws" | "Time Only";
}

export interface ReturnedDataFromCreateCompletedExercise {
    id: number;
    exerciseId: number;
    name: string;
    schema: "Weight Reps" | "Reps Only" | "Weight Throws" | "Time Only";
    sets: SetType[];
}
