import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WorkoutContext } from "@/hooks/workoutContext";

import { lightHaptic } from "@/utils/haptics/haptics";

export default function StartBlankWorkout() {
    const { openWorkout } = useContext(WorkoutContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    openWorkout();
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Start Blank Workout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
        paddingVertical: 10,
        width: "100%"
    },
    button: {
        alignItems: "center",
        backgroundColor: "rgba(115, 197, 255, .8)",
        borderRadius: 15,
        justifyContent: "center",
        paddingVertical: 10,
        width: "80%"
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    }
})