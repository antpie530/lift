import { Text, View } from "react-native";

import Exercises from "./Exercises";
import { styles } from "./styles";
import { CompletedWorkoutCardProps } from "./types";
import Duration from "../Duration/Duration";
import Timestamp from "../Timestamp/Timestamp";

export default function CompletedWorkoutCard({
    name,
    startTimeStamp,
    duration,
    exercises,
}: CompletedWorkoutCardProps) {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardHeader}>{name}</Text>
            <Timestamp timestamp={startTimeStamp} />
            <Duration duration={duration} />
            <Exercises exercises={exercises} />
        </View>
    );
}
