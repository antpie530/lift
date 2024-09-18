import { useState } from "react";
import { Dimensions } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useForm, FormProvider } from "react-hook-form";
import { Exercise } from "@/db/schema";

import TabBar from "@/components/TabBar/TabBar";
import Workout from "@/components/Workout/Workout";
import { WorkoutContext } from "@/hooks/workoutContext";

type WeightReps = {
    weight: number | undefined;
    reps: number | undefined;
    completed: boolean;
};

type RepsOnly = {
    reps: number | undefined;
    completed: boolean;
}

type WeightThrows = {
    weight: number | undefined;
    throws: number | undefined;
    completed: boolean;
}

export type TimeOnly = {
    time: string;
    completed: boolean;
}

export type SetType = WeightReps | RepsOnly | WeightThrows | TimeOnly

type WeightUnits = "lbs" | "kg" | "oz" | "g";

type RepUnits = "reps";

export type TimeUnits = "hours" | "minutes" | "seconds" | "HH:MM:SS" | "HH:MM" | "MM:SS" | "MM:SS.SS";

type ThrowUnits = "throws"

type WeightRepsUnits = {
    weightUnit: WeightUnits;
    repsUnit: RepUnits;
}

type RepsOnlyUnits = {
    repsUnit: RepUnits;
}

type TimeOnlyUnits = {
    timeUnit: TimeUnits
}

type WeightThrowUnits = {
    weightUnit: WeightUnits;
    throwsUnit: ThrowUnits; 
}

type schemaUnits = WeightThrowUnits | RepsOnlyUnits | TimeOnlyUnits | WeightRepsUnits;

export type ExerciseInput = Pick<Exercise, "id" | "name" | "schema"> & { uid: string, schemaUnits: schemaUnits, notes: string, sets: SetType[] };

export interface FormValues {
    name: string,
    notes: string,
    exercises: ExerciseInput[];
}

export default function TabsLayout() {
    const [workoutStartTime, setWorkoutStartTime] = useState<number | undefined>();
    const [workoutIsActive, setWorkoutIsActive] = useState(false);
    const tabBarHeight = useSafeAreaInsets().bottom + 45;
    const workoutHeight = useSharedValue<number>(0);
    const minWorkoutHeight = 65;
    const maxWorkoutHeight = Dimensions.get("window").height - useSafeAreaInsets().top;
    const methods = useForm<FormValues>({
        defaultValues: {
            name: "New Workout",
            notes: "",
            exercises: []
        }
    });

    const { handleSubmit, reset, setValue, getValues, formState: { errors } } = methods

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

    const allSetsAreComplete = () => {
        const exercises = getValues("exercises");
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
        console.log(JSON.stringify(data, null, 2));
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
                    setValue={setValue}
                    onFormSubmit={handleSubmit(onSubmit)}
                    errors={errors}
                    getValues={getValues}
                    allSetsAreComplete={allSetsAreComplete}
                />
            </WorkoutContext.Provider>
        </FormProvider>
    )
}