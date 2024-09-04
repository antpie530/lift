import { Dimensions } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import TabBar from "@/components/TabBar/TabBar";
import Workout from "@/components/Workout/Workout";
import { WorkoutContext } from "@/hooks/workoutContext";

export default function TabsLayout() {
    const tabBarHeight = useSafeAreaInsets().bottom + 45;
    const workoutHeight = useSharedValue<number>(60);
    const minWorkoutHeight = 60;
    const maxWorkoutHeight = Dimensions.get("window").height - useSafeAreaInsets().top;

    const openWorkout = () => {
        workoutHeight.value = withTiming(maxWorkoutHeight, { duration: 200 });
    }

    const closeWorkout = () => {
        workoutHeight.value = withTiming(0, { duration: 200 });
    }

    const offsetAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: interpolate(workoutHeight.value, [minWorkoutHeight, 300], [0, tabBarHeight], Extrapolation.CLAMP)}]
    }));

    return (
        <WorkoutContext.Provider value={{ openWorkout: openWorkout, closeWorkout: closeWorkout }}>
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
            />
        </WorkoutContext.Provider>
    )
}