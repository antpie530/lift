import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

import { getAllWorkoutData } from "@/db/services/getWorkoutData";

import Header from "./Header";
import CompletedWorkouts from "./CompletedWorkouts";

export default function History() {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["workouts", "exercises"],
        queryFn: getAllWorkoutData
    });
    const opacity = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        opacity.value = interpolate(event.contentOffset.y, [0, 85], [0, 1], Extrapolation.CLAMP);
    });
    const animatedHeaderStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));


    return (
        <SafeAreaView style={styles.container}>
            <Header name="History" animatedHeaderStyle={animatedHeaderStyle} />
            {isPending && <Text>Loading...</Text>}
            {isError && <Text>{JSON.stringify(error)}</Text>}
            {data && <CompletedWorkouts workouts={data} scrollHandler={scrollHandler} />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0, 0, 0, 1)",
        flex: 1,
    }
})