import { Text, View } from "react-native";

import { SetsProps } from "./types";

import RepsOnly from "./SetsBySchema/RepsOnly/RepsOnly";
import { SchemaTypes } from "@/types/commonTypes";
import { RepsOnlySet } from "@/db/services/types";

export default function Sets({ schema, sets }: SetsProps) {
    return (
        <View>
            {schema == SchemaTypes.RepsOnly && <RepsOnly sets={sets as RepsOnlySet[]} />}
        </View>
    )
}