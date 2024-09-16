import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Feather from '@expo/vector-icons/Feather';

import { lightHaptic } from "@/utils/haptics/haptics";

interface ConfirmationHeaderProps {
    header: string;
    closeConfirmation: () => void;
}

export default function ConfirmationHeader({ header, closeConfirmation }: ConfirmationHeaderProps) {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    closeConfirmation();
                }}
                style={styles.exitButtonWrapper}
            >
                <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{header}</Text>
            <View style={[styles.exitButtonWrapper, { opacity: 0 }]}>
                <Feather name="x" size={24} color="white" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        position: "relative",
        width: "100%"
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center"
    },
    exitButtonWrapper: {
        backgroundColor: "rgba(255, 255, 255, .3)",
        borderRadius: 5,
        justifyContent: "center"
    }
})