import { StyleSheet, NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Workouts } from "@/db/services/types";

import CompletedWorkoutCard from "@/components/Common/CompletedWorkoutCard/CompletedWorkoutCard";
import ListHeader from "./ListHeader";

interface CompletedWorkoutsProps {
    workouts: Workouts;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export default function CompletedWorkouts({ workouts, scrollHandler }: CompletedWorkoutsProps) {
    const bottomInset = useSafeAreaInsets().bottom;

    return (
        <View style={styles.container}>
            <Animated.FlatList
                onScroll={scrollHandler}
                data={workouts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CompletedWorkoutCard 
                        name={item.name}
                        startTimeStamp={item.startTimestamp}
                        duration={item.duration}
                        exercises={item.exercises.map(exercise => ({
                            name: exercise.name,
                            sets: exercise.sets?.length ?? 0
                        }))}
                    />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={() => <View style={{ height: bottomInset + 45 }}/>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    }
})