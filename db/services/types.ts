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

type SetType = WeightRepsSet | WeightThrowsSet | RepsOnlySet | TimeOnlySet;

type Exercise = {
    id: number;
    exerciseId: number | null;
    name: string;
    notes: string | null;
    schema: "Weight Reps" | "Reps Only" | "Weight Throws" | "Time Only";
    sets?: SetType[]
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