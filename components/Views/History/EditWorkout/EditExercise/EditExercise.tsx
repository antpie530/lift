import Animated, { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";
import { useMutation } from "@tanstack/react-query";

import { createSetFromEdit } from "@/db/services/createSetFromEdit";

import { EditExerciseProps } from "./types";

import AddSetButton from "@/components/Common/AddSetButton";
import Header from "./Header/Header";
import Notes from "./Notes/Notes";
import Sets from "./Sets/Sets";
import { getDefaultSetValues } from "./getDefaultSetValues";

export default function EditExercise({ id, exerciseId, name, notes, schema, sets, onDelete, setExercises }: EditExerciseProps) {
    const mutation = useMutation({
        mutationFn: createSetFromEdit,
        onSuccess: (data) => {
            const newSet = getDefaultSetValues(data.id, schema);
            setExercises((prevExercises) => prevExercises.map(exercise => {
                if (exercise.id === id) {
                    return {
                        ...exercise,
                        sets: [...exercise.sets, newSet]
                    }
                } else {
                    return exercise
                }
            }));
        }
    });
    const addSet = () => {
        mutation.mutate({
            completedExerciseId: exerciseId,
            schema: schema
        });
    }

    return (
        <Animated.View entering={FadeInDown} exiting={FadeOut} layout={LinearTransition}>
            <Header name={name} exerciseId={exerciseId} onDelete={onDelete} />
            <Notes id={id} notes={notes} />
            <Sets schema={schema} sets={sets} exerciseId={exerciseId}/>
            <AddSetButton addSet={addSet}/>
        </Animated.View>
    )
}