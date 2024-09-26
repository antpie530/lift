import { useState } from "react";
import { Dimensions } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { WorkoutContext } from "@/hooks/workoutContext";

import { createWorkout } from "@/db/services/workoutService";

import { FormValues } from "@/types/commonTypes";
import { ExerciseSummary } from "@/components/Common/CompletedWorkoutCard/CompletedWorkoutCard";

import TabBar from "@/components/TabBar/TabBar";
import Workout from "@/components/Workout/Workout";
import WorkoutSuccessPopup from "@/components/WorkoutSuccess/WorkoutSuccessPopup";

export default function TabsLayout() {
    const [workoutStartTime, setWorkoutStartTime] = useState<number>(0);
    const [workoutIsActive, setWorkoutIsActive] = useState(false);
    const [successPopupName, setSuccessPopupName] = useState("");
    const [successPopupTimestamp, setSuccessPopupTimestamp] = useState(0);
    const [successPopupDuration, setSuccessPopupDuration] = useState(0);
    const [successPopupExercises, setSuccessPopupExercises] = useState<ExerciseSummary[]>([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const tabBarHeight = useSafeAreaInsets().bottom + 45;
    const workoutHeight = useSharedValue<number>(0);
    const minWorkoutHeight = 65;
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createWorkout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workouts", "completedExercises"]})
        }
    });
    const maxWorkoutHeight = Dimensions.get("window").height - useSafeAreaInsets().top;
    const methods = useForm<FormValues>({
        defaultValues: {
            name: "New Workout",
            notes: "",
            exercises: []
        }
    });

    const openWorkout = () => {
        setWorkoutIsActive(true);
        setWorkoutStartTime(Date.now());
        workoutHeight.value = withTiming(maxWorkoutHeight, { duration: 200 });
    }

    const closeWorkout = () => {
        setWorkoutIsActive(false);
        setWorkoutStartTime(0);
        methods.reset();
        workoutHeight.value = withTiming(0, { duration: 200 });
    }

    const allSetsAreComplete = () => {
        const exercises = methods.getValues("exercises");
        return exercises.every(exercise => exercise.sets.every(set => set.completed === true));
    }

    const removeUncompleteSets = (data: FormValues) => {
        data.exercises.forEach(exercise => {
            exercise.sets = exercise.sets.filter(set => set.completed === true);
        })
    }

    const onSubmit = (data: FormValues) => {
        removeUncompleteSets(data);
        console.log("Data Submitted");
        console.log(workoutStartTime);
        console.log(Date.now() - workoutStartTime);
        const updatedData = {
            ...data,
            startTimestamp: workoutStartTime,
            duration: Date.now() - workoutStartTime
        }
        mutation.mutate(updatedData);
        console.log(JSON.stringify(updatedData, null, 2));
        setSuccessPopupTimestamp(workoutStartTime);
        setSuccessPopupDuration(updatedData.duration);
        setSuccessPopupName(data.name);
        const exercisesSummary = data.exercises.map(exercise => ({
            name: exercise.name,
            sets: exercise.sets.length
        }));
        setSuccessPopupExercises(exercisesSummary);
        setShowSuccessPopup(true);
        closeWorkout();
    }

    const offsetAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: interpolate(workoutHeight.value, [minWorkoutHeight, 300], [0, tabBarHeight], Extrapolation.CLAMP)}]
    }));

    return (
        <FormProvider {...methods}>
            <WorkoutContext.Provider 
                value={{ 
                    openWorkout: openWorkout, 
                    closeWorkout: closeWorkout,
                    workoutIsActive: workoutIsActive,
                    startTime: workoutStartTime
                }}
            >
                <Tabs 
                    screenOptions={{ headerShown: false }}
                    tabBar={({ state }) => <TabBar state={state} height={tabBarHeight} offset={offsetAnimatedStyle}/>}
                >
                    <Tabs.Screen name="index" />
                    <Tabs.Screen name="exercises" />
                    <Tabs.Screen name="history" />
                </Tabs>
                <Workout 
                    bottom={tabBarHeight} 
                    height={workoutHeight} 
                    offset={offsetAnimatedStyle}
                    minHeight={minWorkoutHeight}
                    maxHeight={maxWorkoutHeight}
                    onFormSubmit={methods.handleSubmit(onSubmit)}
                    allSetsAreComplete={allSetsAreComplete}
                />
                <WorkoutSuccessPopup
                    showPopup={showSuccessPopup}
                    name={successPopupName}
                    startTimestamp={successPopupTimestamp}
                    duration={successPopupDuration}
                    exercises={successPopupExercises}
                    closePopup={() => setShowSuccessPopup(false)}
                />
            </WorkoutContext.Provider>
        </FormProvider>
    )
}