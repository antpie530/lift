import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { getAllExercises } from "@/db/queries";

import Header from "./Header";
import Filters from "./Filters";
import ExerciseList from "./ExerciseList/ExerciseList";
import CreateExerciseForm from "@/components/Forms/CreateExercise/CreateExerciseForm";


interface AddExercisePopUpProps {
    showAddExercisePopUp: boolean;
    closeAddExercisePopUp: () => void;
}

export default function AddExercisePopUp({ 
    showAddExercisePopUp,
    closeAddExercisePopUp
}: AddExercisePopUpProps) {
    const [searchValue, setSearchValue] = useState("");
    const [showCreateExerciseForm, setShowCreateExerciseForm] = useState(false);
    const [selectedIds, setSelectedIds] = useState(new Set<number>());
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["exercises"],
        queryFn: getAllExercises
    });

    const openCreateExerciseForm = () => setShowCreateExerciseForm(true);
    const closeCreateExerciseForm = () => setShowCreateExerciseForm(false);

    const addSelectedId = (id: number) => setSelectedIds(prevSet => new Set(prevSet).add(id));
    const removeSelectedId = (id: number) => {
        const newSet = new Set(selectedIds);
        newSet.delete(id);
        setSelectedIds(newSet);
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
                selectedIds={selectedIds}
                addId={addSelectedId}
                removeId={removeSelectedId}
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
                        close={closeAddExercisePopUp} 
                        selectedExerciseCount={selectedIds.size}
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