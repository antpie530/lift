import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import uuid from 'react-native-uuid';

import { getAllExercises } from "@/db/queries";
import { ExerciseInput } from "@/app/(tabs)/_layout";

import Header from "./Header";
import Filters from "./Filters";
import ExerciseList from "./ExerciseList/ExerciseList";
import CreateExerciseForm from "@/components/Forms/CreateExercise/CreateExerciseForm";


interface AddExercisePopUpProps {
    showAddExercisePopUp: boolean;
    closeAddExercisePopUp: () => void;
    addExercises: (exercises: ExerciseInput[]) => void;
}

export default function AddExercisePopUp({ 
    showAddExercisePopUp,
    closeAddExercisePopUp,
    addExercises
}: AddExercisePopUpProps) {
    const [searchValue, setSearchValue] = useState("");
    const [showCreateExerciseForm, setShowCreateExerciseForm] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState(new Map<number, ExerciseInput>());
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["exercises"],
        queryFn: getAllExercises
    });

    const openCreateExerciseForm = () => setShowCreateExerciseForm(true);
    const closeCreateExerciseForm = () => setShowCreateExerciseForm(false);

    const getDefaultSchemaUnits = (schema: ExerciseInput["schema"]): ExerciseInput["schemaUnits"] => {
        switch (schema) {
            case "Weight Reps":
                return { weightUnit: "lbs", repsUnit: "reps" }
            case "Weight Throws":
                return { weightUnit: "g", throwsUnit: "throws" }
            case "Reps Only":
                return { repsUnit: "reps" }
            case "Time Only":
                return { timeUnit: "seconds" }
        }
    }

    const addSelectedExercise = (exercise: ExerciseInput) => {
        const schemaUnits = getDefaultSchemaUnits(exercise.schema);
        setSelectedExercises(prevSet => new Map(prevSet).set(exercise.id, {
            uid: uuid.v4().toString(),
            id: exercise.id,
            name: exercise.name,
            schema: exercise.schema,
            schemaUnits: schemaUnits,
            notes: "",
            sets: []
        }));
    };
    const removeSelectedExercise = (id: number) => {
        const newSet = new Map(selectedExercises);
        newSet.delete(id);
        setSelectedExercises(newSet);
    }

    const onAdd = () => {
        addExercises(Array.from(selectedExercises.values()));
    }

    let exerciseList;
    if (isPending) {
        exerciseList = <Text>Loading...</Text>
    } else if (isError) {
        exerciseList = <Text>Error: {error.message}</Text>
    } else {
        const filteredData = data.filter(exercise => (
            exercise.name.toLowerCase().includes(searchValue.toLowerCase())
        ));

        exerciseList = (
            <ExerciseList 
                data={filteredData}
                selectedExercises={selectedExercises}
                addExercise={addSelectedExercise}
                removeExercise={removeSelectedExercise}
            />
        )
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showAddExercisePopUp}
        >
            <View style={styles.modal}>
                <View style={styles.content}>
                    <Header 
                        close={() => {
                            setSelectedExercises(new Map<number, ExerciseInput>());
                            closeAddExercisePopUp();
                        }} 
                        selectedExerciseCount={selectedExercises.size}
                        onAdd={onAdd}
                    />
                    <Filters 
                        openCreateExerciseForm={openCreateExerciseForm} 
                        searchValue={searchValue} 
                        setSearchValue={setSearchValue} 
                    />
                    <CreateExerciseForm 
                        showForm={showCreateExerciseForm}
                        closeForm={closeCreateExerciseForm}
                    />
                    {exerciseList}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .7)",
        flex: 1,
        justifyContent: "center"
    },
    content: {
        aspectRatio: 5/9,
        backgroundColor: "rgba(80, 80, 80, 1)",
        borderRadius: 15,
        width: "95%"
    }
});