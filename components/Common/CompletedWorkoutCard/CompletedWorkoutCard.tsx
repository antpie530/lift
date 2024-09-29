import { StyleSheet, Text, View } from "react-native";

import Timestamp from "../Timestamp";
import Duration from "../Duration";
import Exercises from "./Exercises";

export type ExerciseSummary = {
    name: string;
    sets: number;
}

interface CompletedWorkoutCardProps {
    name: string;
    startTimeStamp: number;
    duration: number;
    exercises: ExerciseSummary[];
}

export default function CompletedWorkoutCard({ name, startTimeStamp, duration, exercises }: CompletedWorkoutCardProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{name}</Text>
            <Timestamp timestamp={startTimeStamp} />
            <Duration duration={duration} />
            <Exercises exercises={exercises} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        padding: 15
    },
    header: {
        color: "white",
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 10
    }
})