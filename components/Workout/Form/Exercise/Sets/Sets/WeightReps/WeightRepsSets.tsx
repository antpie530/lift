import { View } from "react-native";
import { FieldArrayWithId } from "react-hook-form";
import { FormValues } from "@/types/commonTypes";

import { styles } from "../styles";

import Header from "./Header";
import Set from "./Set";

interface WeightRepsSetsProps {
    removeSet: (index: number) => void;
    sets: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">[]
    exerciseIndex: number;
}

export default function WeightRepsSets({ exerciseIndex, removeSet, sets }: WeightRepsSetsProps) {
    return (
        <View style={styles.container}>
            <Header exerciseIndex={exerciseIndex} />
            {sets.map((set, index) => (
                 <Set
                    exerciseIndex={exerciseIndex}
                    set={set}
                    setIndex={index}
                    removeSet={removeSet}
                    key={set.keyName}
                />
            ))}
        </View>
    )
}