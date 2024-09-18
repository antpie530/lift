import { FieldArrayWithId, UseFormGetValues } from "react-hook-form";
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
    getValues: UseFormGetValues<FormValues>;
}

export default function Sets({ getValues, schema, removeSet, sets, exerciseIndex }: SetsProps) {
    return (
        <>
            {schema == "Weight Reps" && <WeightRepsSets getValues={getValues} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets}/>}
            {schema == "Reps Only" && <RepsOnlySets getValues={getValues} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
            {schema == "Time Only" && <TimeOnlySets getValues={getValues} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
            {schema == "Weight Throws" && <WeightThrowsSets getValues={getValues} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
        </>
    )
}