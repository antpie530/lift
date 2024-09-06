import { Modal, StyleSheet, View } from "react-native";

import Header from "./Header";

interface AddExercisePopUpProps {
    showAddExercisePopUp: boolean;
    closeAddExercisePopUp: () => void;
}

export default function AddExercisePopUp({ 
    showAddExercisePopUp,
    closeAddExercisePopUp
}: AddExercisePopUpProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showAddExercisePopUp}
        >
            <View style={styles.modal}>
                <View style={styles.content}>
                    <Header close={closeAddExercisePopUp}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .7)",
        flex: 1,
        justifyContent: "center"
    },
    content: {
        aspectRatio: 5/9,
        backgroundColor: "rgba(80, 80, 80, 1)",
        borderRadius: 15,
        width: "95%"
    }
});