import { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

import { Workout } from "@/db/services/types";

import { getAllWorkoutData } from "@/db/services/getWorkoutData";

import Header from "./Header";
import CompletedWorkouts from "./CompletedWorkouts";
import EditWorkout from "./EditWorkout/EditWorkout";

export default function History() {
    const queryClient = useQueryClient();
    const [editWorkoutData, setEditWorkoutData] = useState<Workout | undefined>();
    const visible = editWorkoutData ? true : false;
    const closeEditWorkout = () => {
        queryClient.invalidateQueries({ queryKey: ["workouts"]})
        setEditWorkoutData(undefined) 
    };

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
            {data && <CompletedWorkouts workouts={data} scrollHandler={scrollHandler} setEditWorkoutData={setEditWorkoutData} />}
            <EditWorkout visible={visible} closeEditWorkout={closeEditWorkout} workout={editWorkoutData} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(57, 60, 64, 1)",
        flex: 1,
    }
})