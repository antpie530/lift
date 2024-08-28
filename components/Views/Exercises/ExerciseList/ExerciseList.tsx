import { useState } from "react";
import { FlatList, Text, View } from "react-native";

import { Exercise } from "@/db/schema";

import ExerciseDetailViewer from "@/components/Common/ExerciseDetailViewer/ExerciseDetailViewer";

interface ExerciseListProps {
    isPending: boolean;
    isError: boolean;
    error: Error | null;
    data: Exercise[] | undefined;
}

export default function ExerciseList({ isPending, isError, error, data }: ExerciseListProps) {
    const [showDetails, setShowDetails] = useState(false);

    if (isPending) {
        return <Text>Loading...</Text>
    }

    if (isError) {
        return <Text>Error: {error?.message}</Text>
    }

    if (data?.length == 0) {
        return <Text>No Exercises</Text>
    }

    return (
        <>
            <ExerciseDetailViewer showDetails={showDetails} setShowDetails={setShowDetails} />
            {data?.map(exercise => (
                <Text key={exercise.id}>{exercise.name}</Text>
            ))}
        </>
    )
}