import { View } from "react-native";

import { SetsProps } from "./types";

import { SchemaTypes } from "@/types/commonTypes";
import { RepsOnlySet, TimeOnlySet } from "@/db/services/types";

import RepsOnly from "./SetsBySchema/RepsOnly/RepsOnly";
import TimeOnly from "./SetsBySchema/TimeOnly/TimeOnly";

export default function Sets({ schema, sets }: SetsProps) {
    return (
        <View>
            {schema == SchemaTypes.RepsOnly && <RepsOnly sets={sets as RepsOnlySet[]} />}
            {schema == SchemaTypes.TimeOnly && <TimeOnly sets={sets as TimeOnlySet[]} />}
        </View>
    )
}