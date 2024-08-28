import { Button, Modal, StyleSheet, Text, View } from "react-native";

interface CreateExerciseFormProps {
    showForm: boolean;
    closeForm: () => void;
}

export default function CreateExerciseForm({ showForm, closeForm }: CreateExerciseFormProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showForm}
        >
            <View style={styles.modalBackground}>
                <View style={styles.formContainer}>
                    <Button title="Close" onPress={closeForm}/>
                    <Text>Form Two</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .8)",
        justifyContent: "center",
        flex: 1
    },
    formContainer: {
        aspectRatio: 5/4,
        backgroundColor: "white",
        borderRadius: 15,
        width: "95%"
    }
})