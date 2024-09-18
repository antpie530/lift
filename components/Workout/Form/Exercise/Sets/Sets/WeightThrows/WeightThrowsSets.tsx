import { View } from "react-native";
import { FieldArrayWithId, UseFormGetValues } from "react-hook-form";
import { FormValues } from "@/app/(tabs)/_layout";

import { styles } from "../styles";

import Header from "./Header";
import Set from "./Set";

interface WeightThrowsSetsProps {
    removeSet: (index: number) => void;
    sets: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">[]
    exerciseIndex: number;
    getValues: UseFormGetValues<FormValues>;
}

export default function WeightThrowsSets({ getValues, exerciseIndex, removeSet, sets }: WeightThrowsSetsProps) {
    return (
        <View style={styles.container}>
            <Header exerciseIndex={exerciseIndex}/>
            {sets.map((set, index) => (
                <Set 
                    exerciseIndex={exerciseIndex}
                    set={set}
                    setIndex={index}
                    removeSet={removeSet}
                    key={set.keyName}
                    getValues={getValues}
                />
            ))}
        </View>
    )
}