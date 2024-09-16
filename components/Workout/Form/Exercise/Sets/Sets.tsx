import { Control, FieldArrayWithId, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ExerciseInput, FormValues } from "@/app/(tabs)/_layout";

import WeightRepsSets from "./Sets/WeightReps/WeightRepsSets";
import RepsOnlySets from "./Sets/RepsOnly/RepsOnlySets";
import TimeOnlySets from "./Sets/TimeOnly/TimeOnlySets";
import WeightThrowsSets from "./Sets/WeightThrows/WeightThrowsSets";

interface SetsProps {
    schema: ExerciseInput["schema"];
    removeSet: (index: number) => void;
    sets: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">[]
    exerciseIndex: number;
    control: Control<FormValues>;
    getValues: UseFormGetValues<FormValues>;
    setValue: UseFormSetValue<FormValues>;
}

export default function Sets({ setValue, getValues, schema, removeSet, sets, exerciseIndex, control }: SetsProps) {
    return (
        <>
            {schema == "Weight Reps" && <WeightRepsSets setValue={setValue} getValues={getValues} control={control} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets}/>}
            {schema == "Reps Only" && <RepsOnlySets setValue={setValue} getValues={getValues} control={control} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
            {schema == "Time Only" && <TimeOnlySets setValue={setValue} getValues={getValues} control={control} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
            {schema == "Weight Throws" && <WeightThrowsSets setValue={setValue} getValues={getValues} control={control} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
        </>
    )
}