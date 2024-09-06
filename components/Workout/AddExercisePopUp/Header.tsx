import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';

import { lightHaptic } from "@/utils/haptics/haptics";

interface HeaderProps {
    close: () => void;
}

export default function Header({ close }: HeaderProps) {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    close();
                }}
                style={styles.exitButtonWrapper}
            >
                <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Add Exercises</Text>
            <View style={[styles.exitButtonWrapper, { opacity: 0 }]}>
                <Feather name="x" size={24} color="black" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        flexDirection: "row",
        height: 50,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        width: "100%"
    },
    exitButtonWrapper: {
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, .3)",
        borderRadius: 5,
        justifyContent: "center",
        padding: 3
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "800",
    }
})