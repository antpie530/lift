import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { lightHaptic } from "@/utils/haptics/haptics";

interface FinishButtonProps {
    onFormSubmit: () => void;
}

export default function FinishButton({ onFormSubmit }: FinishButtonProps) {
    return (
        <TouchableOpacity
            onPress={() => {
                lightHaptic();
                onFormSubmit();
            }}
            style={styles.container}
        >
            <Text style={styles.text}>Finish</Text>
        </TouchableOpacity>
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