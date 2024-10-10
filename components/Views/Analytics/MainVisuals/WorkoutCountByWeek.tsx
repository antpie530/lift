import { getWorkoutCountByWeek } from "@/db/services/getWorkoutCountByWeek";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";

import BaseBarChart from "@/components/Common/Analytics/BarChart/BaseBarChart";

interface WorkoutCountByWeekProps {
    width: number;
}

export default function WorkoutCountByWeek({ width }: WorkoutCountByWeekProps) {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["workouts", "byWeek"],
        queryFn: getWorkoutCountByWeek
    });

    if (isPending) {
        return <Text>Loading...</Text>;
    } else if (isError) {
        return <Text>{JSON.stringify(error)}</Text>;
    } else {
        const barData = data.map(weekData => ({
            value: weekData.count,
            label: weekData.weekStart
        }));
        const barWidth = 15
        const yLabelWidthApprox = 25
        const spacing = ((width - barWidth * data.length) / (data.length + 1)) - yLabelWidthApprox;

        const maxDataValue = Math.max(...barData.map((item) => item.value));
        const yAxisMaxValue = Math.ceil(maxDataValue * 1.1); 

        return (
            <BaseBarChart
                data={barData}
                barWidth={barWidth}
                initialSpacing={spacing}
                maxValue={yAxisMaxValue}
                spacing={spacing}
                title="Workouts by the Week"
            />
        );
    }
}