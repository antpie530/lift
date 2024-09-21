import { StyleSheet, Text, View } from "react-native";

import { ExerciseSummary } from "./CompletedWorkoutCard"

interface ExercisesProp {
    exercises: ExerciseSummary[];
}

export default function Exercises({ exercises }: ExercisesProp) {
    let content = "";

    for (let i = 0; i < exercises.length - 1; i++) {
        content += exercises[i].sets + "x" + exercises[i].name + ", "
    }

    content += exercises[exercises.length - 1].sets + "x" + exercises[exercises.length - 1].name;
    return (
        <View>
            <Text style={styles.exercises}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5
    },
    exercises: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    }
})