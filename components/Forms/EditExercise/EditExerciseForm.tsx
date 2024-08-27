import React from "react";
import { Button, Modal, Text, View } from "react-native";

interface EditExerciseFormProps {
    showForm: boolean;
    closeForm: () => void;
}

export default function EditExerciseForm({ showForm, closeForm }: EditExerciseFormProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showForm}
        >
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "rgba(0, 0, 0, .8)" }}>
                <View style={{ aspectRatio: 5/4, width: "95%", backgroundColor: "white", borderRadius: 15 }}>
                    <Button title="Close" onPress={closeForm}/>
                    <Text>Edit Exercise</Text>
                </View>
            </View>
        </Modal>
    )
}