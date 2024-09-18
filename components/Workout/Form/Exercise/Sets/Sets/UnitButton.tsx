import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { lightHaptic } from "@/utils/haptics/haptics";

interface UnitButtonProps {
    unit: string;
    onPress: () => void;
}

export default function UnitButton({ unit, onPress }: UnitButtonProps) {
    return (
        <TouchableOpacity
            onPress={() => {
                lightHaptic();
                onPress();
            }}
        >
            <Text style={styles.text}>{unit}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        paddingVertical: 5
    }
});