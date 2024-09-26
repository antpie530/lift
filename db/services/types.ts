import { SchemaTypes } from "@/types/commonTypes";

type WeightRepsSet  = {
    id: number;
    weight: number;
    reps: number;
}

type WeightThrowsSet = {
    id: number;
    weight: number;
    throws: number;
}

type RepsOnlySet = {
    id: number;
    reps: number;
}

type TimeOnlySet = {
    id: number;
    time: number;
}

export type SetType = WeightRepsSet | WeightThrowsSet | RepsOnlySet | TimeOnlySet;

type Exercise = {
    id: number;
    exerciseId: number | null;
    name: string;
    notes: string | null;
    schema: SchemaTypes;
    sets: SetType[]
}

export type Workout = {
    id: number;
    name: string;
    notes: string | null;
    startTimestamp: number;
    duration: number;
    exercises: Exercise[]
}

export type Workouts = Workout[];