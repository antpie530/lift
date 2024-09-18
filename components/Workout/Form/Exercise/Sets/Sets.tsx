import { FieldArrayWithId } from "react-hook-form";
import { ExerciseInput, FormValues } from "@/types/commonTypes";

import WeightRepsSets from "./Sets/WeightReps/WeightRepsSets";
import RepsOnlySets from "./Sets/RepsOnly/RepsOnlySets";
import TimeOnlySets from "./Sets/TimeOnly/TimeOnlySets";
import WeightThrowsSets from "./Sets/WeightThrows/WeightThrowsSets";

interface SetsProps {
    schema: ExerciseInput["schema"];
    removeSet: (index: number) => void;
    sets: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">[]
    exerciseIndex: number;
}

export default function Sets({ schema, removeSet, sets, exerciseIndex }: SetsProps) {
    return (
        <>
            {schema == "Weight Reps" && <WeightRepsSets exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets}/>}
            {schema == "Reps Only" && <RepsOnlySets exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
            {schema == "Time Only" && <TimeOnlySets exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
            {schema == "Weight Throws" && <WeightThrowsSets exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets} />}
        </>
    )
}