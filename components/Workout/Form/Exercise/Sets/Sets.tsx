import { Control } from "react-hook-form";
import { ExerciseInput, FormValues } from "@/app/(tabs)/_layout";
import { SetType } from "@/app/(tabs)/_layout";

import WeightRepsSets from "./Sets/WeightReps/WeightRepsSets";

interface SetsProps {
    schema: ExerciseInput["schema"];
    removeSet: (index: number) => void;
    sets: SetType[];
    exerciseIndex: number;
    control: Control<FormValues>;
}

export default function Sets({ schema, removeSet, sets, exerciseIndex, control }: SetsProps) {
    return (
        <>
            {schema == "Weight Reps" && <WeightRepsSets control={control} exerciseIndex={exerciseIndex} removeSet={removeSet} sets={sets}/>}
        </>
    )
}