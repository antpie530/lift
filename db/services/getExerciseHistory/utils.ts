import { ExerciseHistoriesObject, ExerciseHistory, HistorySet } from "./types";

export function groupByWorkout(data: HistorySet[]): ExerciseHistory {
    const unsortedData: ExerciseHistoriesObject = {};

    for (const set of data) {
        if (set.timestamp in unsortedData) {
            unsortedData[set.timestamp].push(set);
        } else {
            unsortedData[set.timestamp] = [set];
        }
    }

    const sortedData = Object.entries(unsortedData)
        .map(([timestamp, sets]) => ({
            timestamp: Number(timestamp),
            sets,
        }))
        .sort((a, b) => a.timestamp - b.timestamp);

    return sortedData;
}
