import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { lightHaptic } from "@/utils/haptics/haptics";

import ConfirmationPopUp from "@/components/Common/ConfirmationPopUp/ConfirmationPopUp";

interface FinishButtonProps {
    onFormSubmit: () => void;
    allSetsAreComplete: () => boolean;
}

export default function FinishButton({ onFormSubmit, allSetsAreComplete }: FinishButtonProps) {
    const [showConfirmation, setShowConfrimation] = useState(false);

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    if (allSetsAreComplete()) {
                        onFormSubmit();
                    } else {
                        setShowConfrimation(true);
                    }
                }}
                style={styles.container}
            >
                <Text style={styles.text}>Finish</Text>
            </TouchableOpacity>
            <ConfirmationPopUp 
                header="Warning: Some Sets Not Completed"
                description="All non-completed sets will be removed upon submitting."
                showConfirmation={showConfirmation}
                closeConfirmation={() => setShowConfrimation(false)}
                onConfirm={() => {
                    onFormSubmit();
                    setShowConfrimation(false);
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "rgba(22, 245, 137, .5)",
        borderRadius: 8,
        justifyContent: "center",
        padding: 8
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    }
})