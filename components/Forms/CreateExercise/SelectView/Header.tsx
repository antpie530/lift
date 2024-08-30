import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { Screen } from "../CreateExerciseForm";

interface HeaderProps {
    label: Screen,
    updateScreen: (screen: Screen) => void;
}

export default function Header({ label, updateScreen }: HeaderProps) {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => updateScreen("Inputs")}
                style={styles.backButtonWrapper}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{label != "Inputs" ? label : ""}</Text>
            <View style={[styles.backButtonWrapper, { opacity: 0 }]}>
                <Ionicons name="arrow-back" size={24} color="white" />
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
    backButtonWrapper: {
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