import { StyleSheet, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { lightHaptic } from "@/utils/haptics/haptics";

import { Workout, Workouts } from "@/db/services/types";

import CompletedWorkoutCard from "@/components/Common/CompletedWorkoutCard/CompletedWorkoutCard";
import ListHeader from "./ListHeader";

interface CompletedWorkoutsProps {
    workouts: Workouts;
    scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    setEditWorkoutData: React.Dispatch<React.SetStateAction<Workout | undefined>>;
}

export default function CompletedWorkouts({ workouts, scrollHandler, setEditWorkoutData }: CompletedWorkoutsProps) {
    const bottomInset = useSafeAreaInsets().bottom;

    return (
        <View style={styles.container}>
            <Animated.FlatList
                onScroll={scrollHandler}
                data={workouts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            lightHaptic();
                            setEditWorkoutData(item);
                        }}
                    >
                        <CompletedWorkoutCard 
                            name={item.name}
                            startTimeStamp={item.startTimestamp}
                            duration={item.duration}
                            exercises={item.exercises.map(exercise => ({
                                name: exercise.name,
                                sets: exercise.sets?.length ?? 0
                            }))}
                        />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 15 }}/>}
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