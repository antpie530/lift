import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { WorkoutContext } from "@/hooks/workoutContext";
import { lightHaptic } from "@/utils/haptics/haptics";

import ConfirmationPopUp from "@/components/Common/ConfirmationPopUp/ConfirmationPopUp";

export default function CancelButton() {
    const { closeWorkout } = useContext(WorkoutContext);
    const [showConfirmation, setShowConfirmation] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    setShowConfirmation(true);
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <ConfirmationPopUp 
                header="Cancel Workout"
                description="All data from this workout will be lost. Select 'Confirm' if you would like to proceed."
                showConfirmation={showConfirmation}
                closeConfirmation={() => setShowConfirmation(false)}
                onConfirm={() => {
                    setShowConfirmation(false);
                    closeWorkout();
                }}
            />
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