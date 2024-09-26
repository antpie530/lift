import { Exercise } from "@/db/schema";

export type WeightReps = {
    weight: number | undefined;
    reps: number | undefined;
    completed: boolean;
};

export type RepsOnly = {
    reps: number | undefined;
    completed: boolean;
}

export type WeightThrows = {
    weight: number | undefined;
    throws: number | undefined;
    completed: boolean;
}

export type TimeOnly = {
    time: string;
    completed: boolean;
}

export type SetType = WeightReps | RepsOnly | WeightThrows | TimeOnly;

export enum SchemaTypes {
    WeightReps = "WeightReps",
    RepsOnly = "RepsOnly",
    WeightThrows = "Weight Throws",
    TimeOnly = "TimeOnly"
}

export type WeightUnits = "lbs" | "kg" | "oz" | "g";

export type RepUnits = "reps";

export type TimeUnits = "hours" | "minutes" | "seconds" | "HH:MM:SS" | "HH:MM" | "MM:SS" | "MM:SS.SS";

export type ThrowUnits = "throws"

export type WeightRepsUnits = {
    weightUnit: WeightUnits;
    repsUnit: RepUnits;
}

export type RepsOnlyUnits = {
    repsUnit: RepUnits;
}

export type TimeOnlyUnits = {
    timeUnit: TimeUnits
}

export type WeightThrowUnits = {
    weightUnit: WeightUnits;
    throwsUnit: ThrowUnits; 
}

export type schemaUnits = WeightThrowUnits | RepsOnlyUnits | TimeOnlyUnits | WeightRepsUnits;

export type ExerciseInput = Pick<Exercise, "id" | "name" | "schema"> & { uid: string, schemaUnits: schemaUnits, notes: string, sets: SetType[] };

export interface FormValues {
    name: string,
    notes: string,
    exercises: ExerciseInput[];
}

export interface SubmittedWorkout {
    name: string;
    notes: string;
    startTimestamp: number;
    duration: number;
    exercises: ExerciseInput[];
}