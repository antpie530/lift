import { useState } from "react";
import { Control } from "react-hook-form";
import { FormValues } from "@/app/(tabs)/_layout";

import Header from "./Header";
import Notes from "./Notes";

interface ExerciseProps {
    index: number | undefined;
    name: string;
    id: number;
    removeExercise: (id: number | undefined) => void;
    control: Control<FormValues>;
}

export default function Exercise({ index, name, id, removeExercise, control }: ExerciseProps) {
    const [showNotes, setShowNotes] = useState(false);

    return (
        <>
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
        </>
    )
}