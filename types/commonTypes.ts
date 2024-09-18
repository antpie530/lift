import { Exercise } from "@/db/schema";

type WeightReps = {
    weight: number | undefined;
    reps: number | undefined;
    completed: boolean;
};

type RepsOnly = {
    reps: number | undefined;
    completed: boolean;
}

type WeightThrows = {
    weight: number | undefined;
    throws: number | undefined;
    completed: boolean;
}

export type TimeOnly = {
    time: string;
    completed: boolean;
}

export type SetType = WeightReps | RepsOnly | WeightThrows | TimeOnly

type WeightUnits = "lbs" | "kg" | "oz" | "g";

type RepUnits = "reps";

export type TimeUnits = "hours" | "minutes" | "seconds" | "HH:MM:SS" | "HH:MM" | "MM:SS" | "MM:SS.SS";

type ThrowUnits = "throws"

type WeightRepsUnits = {
    weightUnit: WeightUnits;
    repsUnit: RepUnits;
}

type RepsOnlyUnits = {
    repsUnit: RepUnits;
}

type TimeOnlyUnits = {
    timeUnit: TimeUnits
}

type WeightThrowUnits = {
    weightUnit: WeightUnits;
    throwsUnit: ThrowUnits; 
}

type schemaUnits = WeightThrowUnits | RepsOnlyUnits | TimeOnlyUnits | WeightRepsUnits;

export type ExerciseInput = Pick<Exercise, "id" | "name" | "schema"> & { uid: string, schemaUnits: schemaUnits, notes: string, sets: SetType[] };

export interface FormValues {
    name: string,
    notes: string,
    exercises: ExerciseInput[];
}