import { Modal, TouchableWithoutFeedback, View } from "react-native";

import { lightHaptic } from "@/utils/haptics/haptics";

import { styles } from "./styles";
import { WorkoutSuccessPopupProps } from "./types";

import AnimatedHeader from "./AnimationHeader";
import CompletedWorkoutCard from "../Common/CompletedWorkoutCard/CompletedWorkoutCard";

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