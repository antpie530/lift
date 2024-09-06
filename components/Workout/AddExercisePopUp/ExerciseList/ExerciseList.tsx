import { FlatList } from "react-native";
import { lightHaptic } from "@/utils/haptics/haptics";
import { Exercise } from "@/db/schema";

import ExerciseItem from "./ExerciseItem";

interface ExerciseListProps {
    data: Exercise[];
    selectedIds: Set<number>;
    addId: (id: number) => void;
    removeId: (id: number) => void; 
}

export default function ExerciseList({ data, selectedIds, addId, removeId }: ExerciseListProps) {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <ExerciseItem 
                    name={item.name} 
                    schema={item.schema}
                    selected={selectedIds.has(item.id)}
                    onPress={() => {
                        lightHaptic();
                        if (selectedIds.has(item.id)) {
                            removeId(item.id);
                        } else {
                            addId(item.id);
                        }
                    }}
                />
            )}
            keyExtractor={item => item.id.toString()}
        />
    )
}