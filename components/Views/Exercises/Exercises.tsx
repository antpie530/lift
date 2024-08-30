import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { getAllExercises } from "@/db/queries";

import CreateExerciseForm from "@/components/Forms/CreateExercise/CreateExerciseForm";
import ExerciseList from "./ExerciseList/ExerciseList";
import { lightHaptic } from "@/utils/haptics/haptics";

export default function Exercises() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const { isPending, isError, error, data } = useQuery({
        queryKey: ["exercises"],
        queryFn: getAllExercises
    });

    const openCreateForm = () => setShowCreateForm(true);
    const closeCreateForm = () => setShowCreateForm(false);

    return (
        <>
            <View style={styles.header}>
                <View style={styles.textInputWrapper}>
                    <TextInput 
                        onChangeText={setSearchValue}
                        placeholder="Search exercise..."
                        returnKeyType="done"
                        style={styles.textInput}
                        value={searchValue}
                        clearButtonMode="always"
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        lightHaptic();
                        openCreateForm();
                    }}
                    style={styles.addButtonWrapper}
                >
                    <FontAwesome6 name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <CreateExerciseForm showForm={showCreateForm} closeForm={closeCreateForm} />
                <ExerciseList 
                    isPending={isPending} 
                    isError={isError} 
                    error={error} 
                    data={data?.filter(exercise => exercise.name.toLowerCase().includes(searchValue.toLowerCase())
                )} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        backgroundColor: "rgba(180, 180, 180, 1)",
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10
    },
    textInputWrapper: {
        padding: 5,
        width: "80%"
    },
    textInput: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 8,
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        padding: 8
    },
    addButtonWrapper: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 8,
        padding: 5
    }
})