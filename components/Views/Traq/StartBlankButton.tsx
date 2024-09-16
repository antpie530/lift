import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WorkoutContext } from "@/hooks/workoutContext";

import { lightHaptic } from "@/utils/haptics/haptics";

import ConfirmationPopUp from "@/components/Common/ConfirmationPopUp/ConfirmationPopUp";

export default function StartBlankWorkout() {
    const { openWorkout, closeWorkout, workoutIsActive } = useContext(WorkoutContext);
    const [showConfirmation, setShowConfirmation] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    if (workoutIsActive) {
                        setShowConfirmation(true);
                    } else {
                        openWorkout();
                    }
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Start Blank Workout</Text>
            </TouchableOpacity>
            <ConfirmationPopUp
                header="Workout Already Active"
                description="Current active workout data will be lost. Select 'Confirm' if
                you would still like to proceed to start a new training session."
                showConfirmation={showConfirmation}
                closeConfirmation={() => setShowConfirmation(false)}
                onConfirm={() => {
                    setShowConfirmation(false);
                    closeWorkout();
                    openWorkout();
                }}
            />
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