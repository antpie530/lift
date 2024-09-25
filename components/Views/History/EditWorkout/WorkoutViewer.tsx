import { FlatList, Text, View } from "react-native";

import { Workout } from "@/db/services/types";

import MetaFields from "./MetaFields";
import TimeDataDisplay from "./TimeDataDisplay";

interface WorkoutViewerProps {
    workout: Workout;
}

export default function WorkoutViewer({ workout }: WorkoutViewerProps) {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={workout.exercises}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    null
                )}
                ListHeaderComponent={() => (
                    <>
                        <MetaFields id={workout.id} name={workout.name} notes={workout.notes} />
                        <TimeDataDisplay startTimestamp={workout.startTimestamp} duration={workout.duration} />
                    </>
                )}
            />
        </View>
    )
}