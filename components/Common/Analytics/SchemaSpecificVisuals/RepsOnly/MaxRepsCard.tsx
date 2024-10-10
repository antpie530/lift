import { Text } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { getExerciseName, getMaxReps } from "@/db/queries";

import Card from "../../Card/Card";
import CardLoading from "../../Card/CardLoading";

interface MaxRepsCardProps {
    exerciseId: number;
}

export default function MaxRepsCard({ exerciseId }: MaxRepsCardProps) {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["exercises", "maxReps", exerciseId],
        queryFn: () => getMaxReps(exerciseId)
    });

    const { data: nameData } = useQuery({
        queryKey: ["exercise name", exerciseId],
        queryFn: () => getExerciseName(exerciseId)
    });

    if (isPending) {
        return <CardLoading />
    } else if (isError) {
        return <Text>{JSON.stringify(error)}</Text>
    }

    const name = nameData ? nameData[0].name : "";
    const value = data[0].maxReps ?? 0;

    return (
        <Card 
            title={`Max ${name}`}
            value={value}
            unit="reps"
        />
    );
}