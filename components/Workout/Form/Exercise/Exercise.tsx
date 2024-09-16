import { useState } from "react";
import { Control, useFieldArray, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import Animated, { FadeOut, LinearTransition } from "react-native-reanimated"
import { FormValues, ExerciseInput } from "@/app/(tabs)/_layout";

import Header from "./Header";
import Notes from "./Notes";
import Sets from "./Sets/Sets";
import AddSetButton from "./AddSetButton";

interface ExerciseProps {
    index: number;
    name: string;
    id: number;
    schema: ExerciseInput["schema"];
    removeExercise: (id: number) => void;
    control: Control<FormValues>;
    getValues: UseFormGetValues<FormValues>;
    setValue: UseFormSetValue<FormValues>;
}

export default function Exercise({ index, name, id, schema, removeExercise, control, getValues, setValue }: ExerciseProps) {
    const [showNotes, setShowNotes] = useState(false);

    const { fields: sets, append, remove: removeSet } = useFieldArray({
        control,
        name: `exercises.${index}.sets`,
        keyName: "keyName"
    });

    const addSet = (schema: ExerciseInput["schema"]) => {
        switch(schema) {
            case "Weight Reps":
                append({
                    weight: undefined,
                    reps: undefined,
                    completed: false
                });
                break;
            case "Reps Only":
                append({ 
                    reps: undefined, 
                    completed: false 
                });
                break;
            case "Time Only":
                append({ 
                    time: "", 
                    completed: false
                });
                break;
            case "Weight Throws":
                append({ 
                    weight: undefined, 
                    throws: undefined, 
                    completed: false 
                });
                break;
        }
    };

    return (
        <Animated.View
            exiting={FadeOut}
            layout={LinearTransition}
        >
            <Header 
                index={index} 
                name={name} 
                id={id} 
                removeExercise={removeExercise}
                notesVisible={showNotes}
                closeNotes={() => setShowNotes(false)}
                openNotes={() => setShowNotes(true)}
            />
            {showNotes && <Notes index={index} control={control} />}
            <Sets setValue={setValue} getValues={getValues} control={control} sets={sets} exerciseIndex={index} schema={schema} removeSet={removeSet}/>
            <AddSetButton addSet={() => addSet(schema)}/>
        </Animated.View>
    )
}