import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { lightHaptic } from "@/utils/haptics/haptics";

export default function Timer() {
    return (
        <TouchableOpacity
            onPress={() => {
                lightHaptic();
            }}
            style={styles.container}
        >
            <FontAwesome6 name="clock" size={24} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "rgba(143, 143, 143, .8)",
        borderRadius: 8,
        justifyContent: "center",
        padding: 6
    }
})