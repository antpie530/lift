import { View } from "react-native";
import { FieldArrayWithId, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { FormValues } from "@/app/(tabs)/_layout";

import { styles } from "../styles";

import Header from "./Header";
import Set from "./Set";

interface WeightRepsSetsProps {
    removeSet: (index: number) => void;
    sets: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">[]
    exerciseIndex: number;
    getValues: UseFormGetValues<FormValues>;
    setValue: UseFormSetValue<FormValues>;
}

export default function WeightRepsSets({ getValues, setValue, exerciseIndex, removeSet, sets }: WeightRepsSetsProps) {
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
                    setValue={setValue}
                    getValues={getValues}
                />
            ))}
        </View>
    )
}