import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteSetFromEditContext, HandleDeleteSetProps } from "@/hooks/deleteSetFromEditContext";

import { deleteExercise } from "@/db/queries";
import { deleteSetFromEdit } from "@/db/services/deleteSetFromEdit";

import { Workout } from "@/db/services/types";

import MetaFields from "./MetaFields";
import TimeDataDisplay from "./TimeDataDisplay";
import EditExercise from "./EditExercise/EditExercise";
import { SchemaTypes } from "@/types/commonTypes";

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
    const setMutation = useMutation({
        mutationFn: deleteSetFromEdit
    })

    const handleDeleteExercise = (id: number) => {
        mutation.mutate(id);
        const updatedExercises = exercises.filter(exercise => exercise.id !== id);
        setExercises(updatedExercises);
    }

    const handleDeleteSet = (data: HandleDeleteSetProps) => {
        setMutation.mutate({ schema: data.schema, id: data.id });

        const updatedExerciseData = exercises.map(exercise => {
            if (exercise.id == data.exerciseId) {
                const updatedSets = exercise.sets.filter(set => set.id != data.id);
                console.log("here");
                return {
                    ...exercise,
                    sets: updatedSets,
                };
            }
            return exercise;
        });

        setExercises(updatedExerciseData);
    }

    return (
        <DeleteSetFromEditContext.Provider value={{ handleDeleteSet: handleDeleteSet }}>
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
                            exerciseId={item.id as number}
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
                    ListFooterComponent={() => <View style={{ height: 10 }} />}
                />
            </KeyboardAvoidingView>
        </DeleteSetFromEditContext.Provider>
    )
}