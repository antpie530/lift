import { Text } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { getAllWorkoutData } from "@/db/services/getWorkoutData"

import ScreenWrapper from "@/components/Views/ScreenWrapper";

export default function historyScreen() {
    const {isPending, isError, error, data} = useQuery({
        queryKey: ["completedExercises"],
        queryFn: getAllWorkoutData
    });

    return (
        <ScreenWrapper name="History">
            {isPending && <Text>Loading...</Text>}
            {isError && <Text>{JSON.stringify(error)}</Text>}
            {data && <Text style={{ color: "white" }}>{JSON.stringify(data)}</Text>}
        </ScreenWrapper>
    )
}