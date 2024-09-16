import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { lightHaptic } from "@/utils/haptics/haptics";

import { Exercise } from "@/db/schema";

interface HideExerciseViewProps {
    id: Exercise["id"];
    openHideExercisePopUp: () => void;
}

interface ExerciseListItemProps {
    id: Exercise["id"];
    name: Exercise["name"];
    schema: Exercise["schema"];
    openDetails: () => void;
    openHideExercisePopUp: () => void;
    setShowDetailId: React.Dispatch<React.SetStateAction<number>>;
}

function HideExerciseView ({ id, openHideExercisePopUp }: HideExerciseViewProps) {
    return (
        <View style={{ width: 150 }}>
            <TouchableOpacity 
                style={{ 
                    alignItems: "center", 
                    backgroundColor: "rgba(219, 20, 20, 1)",
                    flex: 1,
                    justifyContent: "center",
                }}
                onPress={() => {
                    lightHaptic();
                    openHideExercisePopUp();
                }}
            >
                <FontAwesome5 name="trash-alt" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default function ExerciseListItem({ id, name, schema, openDetails, openHideExercisePopUp, setShowDetailId }: ExerciseListItemProps) {
    return (
        <Swipeable
            renderRightActions={() => <HideExerciseView id={id} openHideExercisePopUp={openHideExercisePopUp}/>}
        >
            <Pressable
                onPress={() => {
                    lightHaptic();
                    setShowDetailId(id);
                    openDetails();
                }}
                style={({ pressed }) => [
                    { 
                        backgroundColor: pressed ? "rgba(50, 173, 240, 1)" : "rgba(57, 60, 64, 1)",
                    },
                    styles.itemContainer
                ]}
            >
                <Text style={styles.itemText}>{name}</Text>
                <Text style={styles.schema}>{schema}</Text>
            </Pressable>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomWidth: 1,
        borderColor: "rgba(255, 255, 255, .8)",
        padding: 15,
    },
    itemText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    },
    schema: {
        color: "rgba(166, 166, 166, .8)",
        fontWeight: "700"
    }
})