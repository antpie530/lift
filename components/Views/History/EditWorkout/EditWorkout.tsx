import { Button, Modal, StyleSheet, View } from "react-native";

import { Workout } from "@/db/services/types";

import Header from "./Header";
import WorkoutViewer from "./WorkoutViewer";

interface EditWorkoutProps {
    visible: boolean;
    closeEditWorkout: () => void;
    workout: Workout | undefined;
}

export default function EditWorkout({ visible, closeEditWorkout, workout }: EditWorkoutProps) {
    console.log(JSON.stringify(workout));
    return (
        <Modal
            animationType="fade"
            style={styles.modal}
            transparent={true}
            visible={visible}
        >
            <View style={styles.background}>
                <View style={styles.container}>
                    <Header closeWorkout={closeEditWorkout} />
                    {workout && <WorkoutViewer workout={workout} />}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
    background: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .8)",
        flex: 1,
        justifyContent: "center"
    },
    container: {
        aspectRatio: 5/9,
        backgroundColor: "rgba(80, 80, 80, 1)",
        borderRadius: 15,
        width: "95%"
    }
})