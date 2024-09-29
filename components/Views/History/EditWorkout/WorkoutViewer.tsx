import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteSetFromEditContext, HandleDeleteSetProps } from "@/hooks/deleteSetFromEditContext";

import { lightHaptic } from "@/utils/haptics/haptics";

import { deleteExercise } from "@/db/queries";
import { deleteSetFromEdit } from "@/db/services/deleteSetFromEdit";
import { createCompletedExercise } from "@/db/services/createCompletedExercise";

import { Exercise, Workout } from "@/db/services/types";
import { ExerciseInput, SchemaTypes } from "@/types/commonTypes";
import { styles } from "./styles";

import MetaFields from "./MetaFields";
import TimeDataDisplay from "./TimeDataDisplay";
import EditExercise from "./EditExercise/EditExercise";
import AddExerciseButton from "./AddExerciseButton";
import AddExercisePopUp from "@/components/Common/AddExercisePopUp/AddExercisePopUp";

interface WorkoutViewerProps {
    workout: Workout;
}

export default function WorkoutViewer({ workout }: WorkoutViewerProps) {
    const [exercises, setExercises] = useState(workout.exercises);
    const [showAddExercisePopup, setShowAddExercisePopUp] = useState(false);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteExercise,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exercises"]});
        }
    });
    const setMutation = useMutation({
        mutationFn: deleteSetFromEdit
    });
    const addExerciseMutation = useMutation({
        mutationFn: createCompletedExercise,
        onSuccess: (data, variables) => {
            const exercise: Exercise = {
                id: data.id,
                exerciseId: data.exerciseId,
                name: data.name,
                notes: "",
                schema: getSchemaType(data.schema),
                sets: []
            }
            setExercises((prevExercises) => [...prevExercises, exercise]);
        }
    });

    const getSchemaType = (schema: "Weight Reps" | "Reps Only" | "Weight Throws" | "Time Only") => {
        if (schema === "Reps Only") {
            return SchemaTypes.RepsOnly;
        } else if (schema === "Time Only") {
            return SchemaTypes.TimeOnly;
        } else if (schema === "Weight Reps") {
            return SchemaTypes.WeightReps
        } else {
            return SchemaTypes.WeightThrows;
        }
    }

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
                return {
                    ...exercise,
                    sets: updatedSets,
                };
            }
            return exercise;
        });

        setExercises(updatedExerciseData);
    }

    const handleAddPress = () => {
        lightHaptic();
        setShowAddExercisePopUp(true);
    }

    const addExercises = async (exercises: ExerciseInput[]) => {
        console.log(exercises);

        for (const exercise of exercises) {
            await addExerciseMutation.mutateAsync({ 
                workoutId: workout.id,
                exerciseId: exercise.id,
                name: exercise.name,
                schema: exercise.schema
            });
        }
    }

    return (
        <DeleteSetFromEditContext.Provider value={{ handleDeleteSet: handleDeleteSet }}>
            <AddExercisePopUp 
                showAddExercisePopUp={showAddExercisePopup}
                closeAddExercisePopUp={() => setShowAddExercisePopUp(false)}
                addExercises={addExercises}
            />
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
                    ListFooterComponent={() => (
                        <View style={styles.addExerciseButtonWrapper}>
                            <AddExerciseButton onPress={handleAddPress}/>
                        </View>
                    )}
                />
            </KeyboardAvoidingView>
        </DeleteSetFromEditContext.Provider>
    )
}