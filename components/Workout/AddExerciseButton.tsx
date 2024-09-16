import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { lightHaptic } from "@/utils/haptics/haptics";

interface AddExerciseButtonProps {
    openAddExercisePopUp: () => void;
}

export default function AddExerciseButton({ openAddExercisePopUp }: AddExerciseButtonProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    openAddExercisePopUp();
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Add Exercise</Text>
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
        backgroundColor: "rgba(115, 197, 255, .5)",
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