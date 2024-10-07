import { Text } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { getTotalWorkoutCount } from "@/db/queries";

import Card from "@/components/Common/Analytics/Card/Card";
import CardLoading from "@/components/Common/Analytics/Card/CardLoading";

export default function TotalWorkoutsCard() {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["workouts"],
        queryFn: getTotalWorkoutCount
    });

    if (isPending) {
        return <CardLoading />
    } else if (isError) {
        return <Text>Error</Text>
    } else {
        return (
            <Card 
                title="Completed Workouts"
                value={data[0].count}
                unit="all-time"
            />
        );
    }
}