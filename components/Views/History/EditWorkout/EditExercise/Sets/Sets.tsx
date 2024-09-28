import { View } from "react-native";

import { SetsProps } from "./types";

import { SchemaTypes } from "@/types/commonTypes";
import { RepsOnlySet, TimeOnlySet, WeightRepsSet, WeightThrowsSet } from "@/db/services/types";

import RepsOnly from "./SetsBySchema/RepsOnly/RepsOnly";
import TimeOnly from "./SetsBySchema/TimeOnly/TimeOnly";
import WeightReps from "./SetsBySchema/WeightReps/WeightReps";
import WeightThrows from "./SetsBySchema/WeightThrows/WeightThrows";

export default function Sets({ exerciseId, schema, sets }: SetsProps) {
    return (
        <View>
            {schema === SchemaTypes.RepsOnly && <RepsOnly exerciseId={exerciseId} sets={sets as RepsOnlySet[]} />}
            {schema === SchemaTypes.TimeOnly && <TimeOnly exerciseId={exerciseId} sets={sets as TimeOnlySet[]} />}
            {schema === SchemaTypes.WeightReps && <WeightReps exerciseId={exerciseId} sets={sets as WeightRepsSet[]} />}
            {schema === SchemaTypes.WeightThrows && <WeightThrows exerciseId={exerciseId} sets={sets as WeightThrowsSet[]} />}
        </View>
    )
}