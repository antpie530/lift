import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Feather from '@expo/vector-icons/Feather';

import ConfirmationPopUp from "@/components/Common/ConfirmationPopUp/ConfirmationPopUp";
import { lightHaptic } from "@/utils/haptics/haptics";

interface RemoveButtonProps {
    name: string,
    removeExercise: () => void;
}

export default function RemoveButton({ name, removeExercise }: RemoveButtonProps) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    setShowConfirmation(true);
                }}
                style={styles.container}
            >
                <Feather name="x" size={20} color="red" />
                <Text style={styles.text}>Remove Exercise</Text>
            </TouchableOpacity>
            <ConfirmationPopUp 
                header={`Remove ${name}`}
                description="All data for this exercise for this workout will be lost. Tap 'Confirm' to continue."
                showConfirmation={showConfirmation}
                closeConfirmation={() => setShowConfirmation(false)}
                onConfirm={() => {
                    setShowConfirmation(false);
                    removeExercise();
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    }
})