import { useState } from "react";
import { StyleSheet } from "react-native";
import Animated, { useSharedValue, AnimatedStyle, SharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import TopTab from "./TopTab";
import CancelButton from "./CancelButton";
import AddExerciseButton from "./AddExerciseButton";
import EllapsedTime from "./EllapsedTime";
import AddExercisePopUp from "./AddExercisePopUp/AddExercisePopUp";

interface WorkoutProps {
    bottom: number;
    height: SharedValue<number>;
    offset: AnimatedStyle;
    minHeight: number;
    maxHeight: number;
    startTime: number | undefined;
}

export default function Workout({ bottom, height, offset, minHeight, maxHeight, startTime }: WorkoutProps) {
    const [showAddExercisePopUp, setShowAddExercisePopUp] = useState(false);
    const prevHeight = useSharedValue(0);
    const velo = useSharedValue(0);

    const pan = Gesture.Pan()
        .onStart(() => {
            prevHeight.value = height.value
        })
        .onUpdate((event) => {
            let newHeight = prevHeight.value - event.translationY
            if (newHeight < minHeight) {
                newHeight = minHeight;
            } else if (newHeight > maxHeight) {
                newHeight = maxHeight;
            }
            height.value = newHeight
            velo.value = event.velocityY;
        })
        .onEnd(() => {
            if (velo.value < -300) {
                height.value = withTiming(maxHeight, { duration: 200 })
            } else if (velo.value > 300) {
                height.value = withTiming(minHeight, { duration: 200 })
            } else if (height.value < 300) {
                height.value = withTiming(minHeight, { duration: 200 })
            } else {
                height.value = withTiming(maxHeight, { duration: 200 })
            }
        });

    return (
        <Animated.View style={[styles.container, { bottom, height }, offset ]}>
            <GestureDetector gesture={pan}>
                <TopTab />
            </GestureDetector>
            <EllapsedTime startTime={startTime} />
            <AddExerciseButton openAddExercisePopUp={() => setShowAddExercisePopUp(true)}/>
            <CancelButton />
            <AddExercisePopUp 
                showAddExercisePopUp={showAddExercisePopUp}
                closeAddExercisePopUp={() => setShowAddExercisePopUp(false)}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(73, 76, 82, 1)",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        flex: 1,
        overflow: "hidden",
        position: "absolute",
        width: "100%"
    }
})