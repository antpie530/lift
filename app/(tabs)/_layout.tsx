import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

import TabBar from "@/components/TabBar/TabBar";
import Workout from "@/components/Workout/Workout";

export default function TabsLayout() {
    const tabBarHeight = useSafeAreaInsets().bottom + 45;
    const workoutHeight = useSharedValue<number>(60);
    const minWorkoutHeight = 60;

    const offsetAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: interpolate(workoutHeight.value, [minWorkoutHeight, 300], [0, tabBarHeight], Extrapolation.CLAMP)}]
    }))

    return (
        <>
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
            />
        </>
    )
}