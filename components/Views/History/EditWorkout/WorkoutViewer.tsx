import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteExercise } from "@/db/queries";

import { Workout } from "@/db/services/types";

import MetaFields from "./MetaFields";
import TimeDataDisplay from "./TimeDataDisplay";
import EditExercise from "./EditExercise/EditExercise";

interface WorkoutViewerProps {
    workout: Workout;
}

export default function WorkoutViewer({ workout }: WorkoutViewerProps) {
    const [exercises, setExercises] = useState(workout.exercises);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteExercise,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exercises"]});
        }
    });

    const handleDeleteExercise = (id: number) => {
        mutation.mutate(id);
        const updatedExercises = exercises.filter(exercise => exercise.id !== id);
        setExercises(updatedExercises);
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <FlatList
                data={exercises}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <EditExercise 
                        id={item.id}
                        exerciseId={item.exerciseId as number}
                        name={item.name}
                        notes={item.notes}
                        schema={item.schema}
                        sets={item.sets}
                        onDelete={() => handleDeleteExercise(item.id)}
                    />
                )}
                ListHeaderComponent={() => (
                    <>
                        <MetaFields id={workout.id} name={workout.name} notes={workout.notes} />
                        <TimeDataDisplay startTimestamp={workout.startTimestamp} duration={workout.duration} />
                    </>
                )}
            />
        </KeyboardAvoidingView>
    )
}