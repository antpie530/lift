import { Exercise } from "@/db/schema";

export type HistoryRepsOnlySet = {
    timestamp: number;
    reps: number;
    setNumber: number;
};

export type HistoryTimeOnlySet = {
    timestamp: number;
    time: number;
    setNumber: number;
};

export type HistoryWeightRepsSet = {
    timestamp: number;
    weight: number;
    reps: number;
    setNumber: number;
};

export type HistoryWeightThrowsSet = {
    timestamp: number;
    weight: number;
    throws: number;
    setNumber: number;
};

export type HistorySet =
    | HistoryRepsOnlySet
    | HistoryTimeOnlySet
    | HistoryWeightRepsSet
    | HistoryWeightThrowsSet;

export type ExerciseHistoriesObject = {
    [timestamp: number]: HistorySet[];
};

export type ExerciseHistory = {
    timestamp: number;
    sets: HistorySet[];
}[];

export type ExerciseHistoryWithSchema = {
    schema: Exercise["schema"];
    history: ExerciseHistory;
};
