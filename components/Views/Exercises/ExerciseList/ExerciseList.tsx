import { useState } from "react";
import { Text } from "react-native";

import { Exercise } from "@/db/schema";

import ExerciseDetailViewer from "@/components/Common/ExerciseDetailViewer/ExerciseDetailViewer";
import ExerciseListItem from "./ExerciseListItem";

interface ExerciseListProps {
    isPending: boolean;
    isError: boolean;
    error: Error | null;
    data: Exercise[] | undefined;
}

export default function ExerciseList({ isPending, isError, error, data }: ExerciseListProps) {
    const [showDetails, setShowDetails] = useState(false);
    const openDetails = () => setShowDetails(true);

    if (isPending) {
        return <Text>Loading...</Text>
    }

    if (isError) {
        return <Text>Error: {error?.message}</Text>
    }

    if (data?.length == 0) {
        return <Text>No exercises</Text>
    }

    return (
        <>
            <ExerciseDetailViewer showDetails={showDetails} setShowDetails={setShowDetails} />
            {data?.map(exercise => (
                <ExerciseListItem 
                    id={exercise.id} 
                    name={exercise.name} 
                    schema={exercise.schema} 
                    openDetails={openDetails}
                />
            ))}
        </>
    )
}