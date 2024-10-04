import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

import { getExerciseHistory } from "@/db/services/getExerciseHistory/getExerciseHistory";

import HistoryCards from "./HistoryCards";
import { styles } from "./styles";
import { ExerciseHistoryProps } from "./types";

export default function ExerciseHistory({ id }: ExerciseHistoryProps) {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["history", id],
        queryFn: () => getExerciseHistory(id),
    });

    let content;
    if (isPending) {
        content = <Text>Loading...</Text>;
    } else if (isError) {
        content = <Text>{JSON.stringify(error)}</Text>;
    } else if (data) {
        console.log("Component Data");
        content = <HistoryCards schema={data.schema} history={data.history} />;
    }

    return <View style={styles.exerciseHistoryContainer}>{content}</View>;
}
