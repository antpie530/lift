import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';

import { lightHaptic } from "@/utils/haptics/haptics";

interface HeaderProps {
    close: () => void;
    selectedExerciseCount: number;
}

export default function Header({ close, selectedExerciseCount }: HeaderProps) {
    let addButton;
    if (selectedExerciseCount > 0) {
        addButton = (
            <TouchableOpacity style={[styles.exitButtonWrapper]}>
                <Text style={[styles.addButtonText, { color: "white"}]}>Add({selectedExerciseCount})</Text>
            </TouchableOpacity>
            
        )
    } else {
        addButton = (
            <View style={[styles.exitButtonWrapper, { backgroundColor: "transparent"}]}>
                <Text style={styles.addButtonText}>Add</Text>
            </View>
        )
    }

    return (
        <View style={styles.header}>
            <View style={styles.exitWrapper}>
                <TouchableOpacity
                    onPress={() => {
                        lightHaptic();
                        close();
                    }}
                    style={styles.exitButtonWrapper}
                >
                    <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.headerTextWrapper}>
                <Text style={styles.headerText}>Add Exercises</Text>
            </View>
            <View style={styles.addWrapper}>
                {addButton}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        flexDirection: "row",
        height: 50,
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
    headerTextWrapper: {
        alignItems: "center",
        flex: 2,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "800",
    },
    addButtonWrapper: {
        width: 70
    },
    addButtonText: {
        color: "rgba(250, 250, 250, .3)",
        fontSize: 18,
        fontWeight: "700"
    },
    exitWrapper: {
        alignItems: "flex-start",
        flex: 1
    },
    addWrapper: {
        alignItems: "flex-end",
        flex: 1
    }
})