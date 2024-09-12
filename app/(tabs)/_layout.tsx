import { useState } from "react";
import { Dimensions } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useForm } from "react-hook-form";
import { Exercise } from "@/db/schema";

import TabBar from "@/components/TabBar/TabBar";
import Workout from "@/components/Workout/Workout";
import { WorkoutContext } from "@/hooks/workoutContext";

type WeightReps = {
    weight: number;
    reps: number;
    completed: boolean;
};

type RepsOnly = {
    reps: number;
    completed: boolean;
}

type WeightThrows = {
    weight: number;
    throws: number;
    completed: boolean;
}

type TimeOnly = {
    time: number;
    completed: boolean;
}

export type SetType = WeightReps | RepsOnly | WeightThrows | TimeOnly

export type ExerciseInput = Pick<Exercise, "id" | "name" | "schema"> & { notes: string, sets: SetType[] };

export interface FormValues {
    exercises: ExerciseInput[];
}

export default function TabsLayout() {
    const [workoutStartTime, setWorkoutStartTime] = useState<number | undefined>();
    const [workoutIsActive, setWorkoutIsActive] = useState(false);
    const tabBarHeight = useSafeAreaInsets().bottom + 45;
    const workoutHeight = useSharedValue<number>(0);
    const minWorkoutHeight = 65;
    const maxWorkoutHeight = Dimensions.get("window").height - useSafeAreaInsets().top;
    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
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
        setWorkoutStartTime(undefined);
        reset();
        workoutHeight.value = withTiming(0, { duration: 200 });
    }

    const onSubmit = (data: FormValues) => {
        console.log("Data Submitted");
        console.log(JSON.stringify(data, null, 2));
        closeWorkout();
    }

    const offsetAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: interpolate(workoutHeight.value, [minWorkoutHeight, 300], [0, tabBarHeight], Extrapolation.CLAMP)}]
    }));

    return (
        <WorkoutContext.Provider 
            value={{ 
                openWorkout: openWorkout, 
                closeWorkout: closeWorkout,
                workoutIsActive: workoutIsActive 
            }}
        >
            <Tabs 
                screenOptions={{ headerShown: false }}
                tabBar={({ state }) => <TabBar state={state} height={tabBarHeight} offset={offsetAnimatedStyle}/>}
            >
                <Tabs.Screen name="index" />
                <Tabs.Screen name="exercises" />
            </Tabs>
            <Workout 
                bottom={tabBarHeight} 
                height={workoutHeight} 
                offset={offsetAnimatedStyle}
                minHeight={minWorkoutHeight}
                maxHeight={maxWorkoutHeight}
                startTime={workoutStartTime}
                control={control}
                setValue={setValue}
                onFormSubmit={handleSubmit(onSubmit)}
                errors={errors}
            />
        </WorkoutContext.Provider>
    )
}