import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Feather from '@expo/vector-icons/Feather';

import { mediumHaptic } from "@/utils/haptics/haptics";

interface HeaderProps {
    closeForm: () => void;
    handleSubmit: () => void;
    reset: () => void;
}

export default function Header({ closeForm, handleSubmit, reset }: HeaderProps) {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    mediumHaptic();
                    reset();
                    closeForm();
                }}
                style={styles.exitButtonWrapper}
            >
                <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Create Exercise</Text>
            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.exitButtonWrapper}
            >
                <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
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
    },
    exitButtonWrapper: {
        backgroundColor: "rgba(255, 255, 255, .3)",
        borderRadius: 5,
        justifyContent: "center"
    },
    save: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
        padding: 4
    }
})