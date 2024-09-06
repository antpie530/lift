import { FlatList } from "react-native";
import { lightHaptic } from "@/utils/haptics/haptics";
import { Exercise } from "@/db/schema";
import { ExerciseInput } from "../../Workout";

import ExerciseItem from "./ExerciseItem";

interface ExerciseListProps {
    data: Exercise[];
    selectedExercises: Map<number, ExerciseInput>;
    addExercise: (exercise: ExerciseInput) => void;
    removeExercise: (id: number) => void; 
}

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