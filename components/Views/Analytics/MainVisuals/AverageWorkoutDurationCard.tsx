import { Text } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { getAverageWorkoutDuration } from "@/db/queries";

import Card from "@/components/Common/Analytics/Card/Card";
import CardLoading from "@/components/Common/Analytics/Card/CardLoading";

export default function AverageWorkoutDurationCard() {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["workouts", "exercises", "duration"],
        queryFn: getAverageWorkoutDuration
    });

    if (isPending) {
        return <CardLoading />
    } else if (isError) {
        return <Text>Error</Text>
    } else {
        const value = Math.floor(Number(data[0].value) / 60000);

        return (
            <Card 
                title="Average Workout Duration"
                value={value}
                unit={value == 1 ? "minute" : "minutes"}
            />
        );
    }
}