import { Pressable, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Exercise } from "@/db/schema";

interface HideExerciseViewProps {
    id: Exercise["id"];
}

interface ExerciseListItemProps {
    id: Exercise["id"];
    name: Exercise["name"];
    schema: Exercise["schema"];
    openDetails: () => void;
}

function HideExerciseView ({ id }: HideExerciseViewProps) {
    return (
        <View style={{ width: 150 }}>
            <TouchableOpacity 
                style={{ 
                    alignItems: "center", 
                    backgroundColor: "rgba(219, 20, 20, 1)",
                    flex: 1,
                    justifyContent: "center",
                }}
                onPress={() => console.log("Hiding exercise", id)}
            >
                <FontAwesome5 name="trash-alt" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default function ExerciseListItem({ id, name, schema, openDetails }: ExerciseListItemProps) {
    return (
        <Swipeable
            renderRightActions={() => <HideExerciseView id={id} />}
        >
            <Pressable
                onPress={() => {
                    console.log("Show edit for ID:", id)
                    openDetails();
                }}
                style={({ pressed }) => [{ 
                    backgroundColor: pressed ? "rgba(50, 173, 240, .8)" : "white",
                    padding: 15 
                }]}
            >
                <Text>{name}</Text>
            </Pressable>
        </Swipeable>
    )
}