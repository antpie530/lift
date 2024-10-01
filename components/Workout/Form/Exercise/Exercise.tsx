import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import Animated, { FadeOut, LinearTransition } from "react-native-reanimated"
import { ExerciseInput, FormValues } from "@/types/commonTypes";

import Header from "./Header";
import Notes from "./Notes";
import Sets from "./Sets/Sets";
import AddSetButton from "../../../Common/Buttons/AddSetButton/AddSetButton";

interface ExerciseProps {
    index: number;
    name: string;
    id: number;
    schema: ExerciseInput["schema"];
    removeExercise: (id: number) => void;
}

export default function Exercise({ index, name, id, schema, removeExercise }: ExerciseProps) {
    const [showNotes, setShowNotes] = useState(false);
    const { control } = useFormContext<FormValues>();

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
            {showNotes && <Notes index={index} />}
            <Sets sets={sets} exerciseIndex={index} schema={schema} removeSet={removeSet}/>
            <AddSetButton addSet={() => addSet(schema)}/>
        </Animated.View>
    )
}