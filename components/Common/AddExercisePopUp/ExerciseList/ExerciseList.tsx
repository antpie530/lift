import { FlatList } from "react-native";

import { lightHaptic } from "@/utils/haptics/haptics";

import { ExerciseListProps } from "./types";

import ExerciseItem from "./ExerciseItem";

export default function ExerciseList({ data, selectedExercises, addExercise, removeExercise }: ExerciseListProps) {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <ExerciseItem 
                    name={item.name} 
                    schema={item.schema}
                    selected={selectedExercises.has(item.id)}
                    onPress={() => {
                        lightHaptic();
                        if (selectedExercises.has(item.id)) {
                            removeExercise(item.id);
                        } else {
                            addExercise(item);
                        }
                    }}
                />
            )}
            keyExtractor={item => item.id.toString()}
        />
    )
}