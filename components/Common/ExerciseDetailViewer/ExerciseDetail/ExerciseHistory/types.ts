import { Exercise } from "@/db/schema";
import {
    ExerciseHistoryWithSchema,
    HistoryRepsOnlySet,
    HistoryTimeOnlySet,
    HistoryWeightRepsSet,
    HistoryWeightThrowsSet,
} from "@/db/services/getExerciseHistory/types";
import { HistorySet } from "@/db/services/getExerciseHistory/types";

export interface ExerciseHistoryProps {
    id: number;
}

export interface HistoryCardsProps extends ExerciseHistoryWithSchema {}

export interface HistoryCardProps {
    timestamp: number;
    schema: Exercise["schema"];
    sets: HistorySet[];
}

export interface RowsProps {
    schema: Exercise["schema"];
    sets: HistorySet[];
}

export interface RepsOnlyRowsProps {
    sets: HistoryRepsOnlySet[];
}

export interface TimeOnlyRowsProps {
    sets: HistoryTimeOnlySet[];
}

export interface WeightRepsRowsProps {
    sets: HistoryWeightRepsSet[];
}

export interface WeightThrowsRowsProps {
    sets: HistoryWeightThrowsSet[];
}
