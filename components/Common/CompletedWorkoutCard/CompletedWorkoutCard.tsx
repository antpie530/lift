import { Text, View } from "react-native";

import { styles } from "./styles";
import { CompletedWorkoutCardProps } from "./types";

import Timestamp from "../Timestamp/Timestamp";
import Duration from "../Duration/Duration";
import Exercises from "./Exercises";

export default function CompletedWorkoutCard({ name, startTimeStamp, duration, exercises }: CompletedWorkoutCardProps) {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardHeader}>{name}</Text>
            <Timestamp timestamp={startTimeStamp} />
            <Duration duration={duration} />
            <Exercises exercises={exercises} />
        </View>
    )
}