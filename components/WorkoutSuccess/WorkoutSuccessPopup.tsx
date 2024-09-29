import { StyleSheet, Modal, TouchableWithoutFeedback, View } from "react-native";

import { lightHaptic } from "@/utils/haptics/haptics";

import { ExerciseSummary } from "../Common/CompletedWorkoutCard/CompletedWorkoutCard";

import AnimatedHeader from "./AnimationHeader";
import CompletedWorkoutCard from "../Common/CompletedWorkoutCard/CompletedWorkoutCard";

interface WorkoutSuccessPopupProps {
    showPopup: boolean;
    closePopup: () => void;
    name: string;
    startTimestamp: number;
    duration: number;
    exercises: ExerciseSummary[];
}

export default function WorkoutSuccessPopup({ showPopup, closePopup, name, startTimestamp, duration, exercises }: WorkoutSuccessPopupProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showPopup}
            style={styles.modal}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    lightHaptic();
                    closePopup();
                }}
                style={{ flex: 1 }}
            >
                <View style={styles.background}>
                    <View style={styles.container}>
                        <AnimatedHeader />
                        <CompletedWorkoutCard 
                            name={name}
                            startTimeStamp={startTimestamp}
                            duration={duration}
                            exercises={exercises}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
        justifyContent: "center",
        flex: 1
    },
    container: {
        aspectRatio: 5/7,
        backgroundColor: "rgba(80, 80, 80, 1)",
        borderRadius: 15,
        padding: 15,
        width: "95%"
    }
})