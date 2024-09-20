import { useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue, 
    AnimatedStyle, 
    SharedValue, 
    withTiming,
    interpolate,
    Extrapolation
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ExerciseInput, FormValues } from "@/types/commonTypes";

import TopTab from "./TopTab";
import EllapsedTime from "./EllapsedTime";
import Header from "./Header/Header";
import AddExercisePopUp from "./AddExercisePopUp/AddExercisePopUp";
import Form from "./Form/Form";

interface WorkoutProps {
    bottom: number;
    height: SharedValue<number>;
    offset: AnimatedStyle;
    minHeight: number;
    maxHeight: number;
    onFormSubmit: () => void;
    allSetsAreComplete: () => boolean;
}

export default function Workout({ bottom, height, offset, minHeight, maxHeight, onFormSubmit, allSetsAreComplete  }: WorkoutProps) {
    const [showAddExercisePopUp, setShowAddExercisePopUp] = useState(false);
    const prevHeight = useSharedValue(0);
    const velo = useSharedValue(0);
    const opacity = useSharedValue(0);
    const { control } = useFormContext<FormValues>();

    const { fields: exercises, append, remove, move } = useFieldArray({
        control,
        name: "exercises",
        keyName: "keyName"
    });

    const addExercises = (exercises: ExerciseInput[]) => {
        exercises.forEach(exercise => {
            append(exercise);
        });
    }

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
            <Header allSetsAreComplete={allSetsAreComplete} headerHeight={minHeight} height={height} onFormSubmit={onFormSubmit} />
            <Form 
                remove={remove} 
                data={exercises}
                openAddExercisePopUp={() => setShowAddExercisePopUp(true)} 
                move={move}
            />
            <AddExercisePopUp
                showAddExercisePopUp={showAddExercisePopUp}
                closeAddExercisePopUp={() => setShowAddExercisePopUp(false)}
                addExercises={addExercises}
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