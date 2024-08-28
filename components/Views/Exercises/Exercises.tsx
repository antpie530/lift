import { useState } from "react";
import { Button, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { getAllExercises } from "@/db/queries";

import CreateExerciseForm from "@/components/Forms/CreateExercise/CreateExerciseForm";
import ExerciseList from "./ExerciseList/ExerciseList";

export default function Exercises() {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const { isPending, isError, error, data } = useQuery({
        queryKey: ["exercises"],
        queryFn: getAllExercises
    });

    const openCreateForm = () => setShowCreateForm(true);
    const closeCreateForm = () => setShowCreateForm(false);

    return (
        <View style={{ flex: 1 }}>
            <Button title="Create Exercise" onPress={openCreateForm} />
            <CreateExerciseForm showForm={showCreateForm} closeForm={closeCreateForm} />
            <ExerciseList isPending={isPending} isError={isError} error={error} data={data} />
        </View>
    )
}