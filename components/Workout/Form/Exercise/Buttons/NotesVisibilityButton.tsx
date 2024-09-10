import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import { lightHaptic } from "@/utils/haptics/haptics";

interface NotesVisibilityButtonProps {
    notesVisible: boolean;
    closeNotes: () => void;
    openNotes: () => void;
}

export default function NotesVisibilityButton({ notesVisible, closeNotes, openNotes}: NotesVisibilityButtonProps) {
    return (
        <TouchableOpacity
            onPress={() => {
                lightHaptic();
                if (notesVisible) {
                    closeNotes();
                } else {
                    openNotes();
                }
            }}
            style={styles.container}
        >
            <View style={styles.icon}>
                <Foundation name="clipboard-notes" size={20} color="white" />
            </View>
            <Text style={styles.text}>{notesVisible ? "Hide" : "Show"} Notes</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    icon: {
        alignItems: "center",
        width: 25
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    }
})