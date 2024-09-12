import { Control, FieldArrayWithId } from "react-hook-form";
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
}

export default function Sets({ schema, removeSet, sets, exerciseIndex, control }: SetsProps) {
    return (
        <>
            {schema == "Weight Reps" && <WeightRepsSets control={control} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets}/>}
            {schema == "Reps Only" && <RepsOnlySets control={control} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
            {schema == "Time Only" && <TimeOnlySets control={control} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
            {schema == "Weight Throws" && <WeightThrowsSets control={control} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
        </>
    )
}