import { View } from "react-native";

import {
    HistoryRepsOnlySet,
    HistoryTimeOnlySet,
    HistoryWeightRepsSet,
    HistoryWeightThrowsSet,
} from "@/db/services/getExerciseHistory/types";

import { RowsProps } from "../types";
import RepsOnlyRows from "./RepsOnlyRows";
import TimeOnlyRows from "./TimeOnlyRows";
import WeightRepsRows from "./WeightRepsRows";
import WeightThrowsRows from "./WeightThrowsRows";

export default function Rows({ schema, sets }: RowsProps) {
    return (
        <View>
            {schema === "Reps Only" && (
                <RepsOnlyRows sets={sets as HistoryRepsOnlySet[]} />
            )}
            {schema === "Time Only" && (
                <TimeOnlyRows sets={sets as HistoryTimeOnlySet[]} />
            )}
            {schema === "Weight Reps" && (
                <WeightRepsRows sets={sets as HistoryWeightRepsSet[]} />
            )}
            {schema === "Weight Throws" && (
                <WeightThrowsRows sets={sets as HistoryWeightThrowsSet[]} />
            )}
        </View>
    );
}
