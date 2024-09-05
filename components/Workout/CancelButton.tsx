import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { WorkoutContext } from "@/hooks/workoutContext";
import { lightHaptic } from "@/utils/haptics/haptics";

export default function CancelButton() {
    const { closeWorkout } = useContext(WorkoutContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    closeWorkout();
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
        width: "100%"
    },
    button: {
        alignItems: "center",
        backgroundColor: "rgba(250, 0, 0, .5)",
        borderRadius: 15,
        justifyContent: "center",
        paddingVertical: 5,
        width: "80%"
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    }
})