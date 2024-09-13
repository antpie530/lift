import { View } from "react-native";
import { Control, FieldArrayWithId, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { FormValues } from "@/app/(tabs)/_layout";

import { styles } from "../styles";

import Header from "./Header";
import Set from "./Set";

interface TimeOnlySetsProps {
    removeSet: (index: number) => void;
    sets: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">[]
    exerciseIndex: number;
    control: Control<FormValues>;
    setValue: UseFormSetValue<FormValues>;
    getValues: UseFormGetValues<FormValues>;
}

export default function TimeOnlySets({ getValues, setValue, exerciseIndex, removeSet, sets, control }: TimeOnlySetsProps) {
    return (
        <View style={styles.container}>
            <Header />
            {sets.map((set, index) => (
                <Set 
                    control={control}
                    exerciseIndex={exerciseIndex}
                    set={set}
                    setIndex={index}
                    removeSet={removeSet}
                    key={set.keyName}
                    getValues={getValues}
                    setValue={setValue}
                />
            ))}
        </View>
    )
}