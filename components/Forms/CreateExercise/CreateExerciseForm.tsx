import { Button, Modal, Text, View } from "react-native";

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
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "rgba(0, 0, 0, .8)" }}>
                <View style={{ aspectRatio: 5/4, width: "95%", backgroundColor: "white", borderRadius: 15 }}>
                    <Button title="Close" onPress={closeForm}/>
                    <Text>Form Two</Text>
                </View>
            </View>
        </Modal>
    )
}