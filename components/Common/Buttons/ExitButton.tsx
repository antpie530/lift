import { StyleSheet, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';

import { lightHaptic } from "@/utils/haptics/haptics";

interface ExitButtonProps {
    onPress: () => void;
}

export default function ExitButton({ onPress }: ExitButtonProps) {
    return (
        <TouchableOpacity
            onPress={() => {
                lightHaptic();
                onPress();
            }}
            style={styles.container}
        >
            <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255, 255, 255, .3)",
        borderRadius: 5,
        justifyContent: "center"
    }
})