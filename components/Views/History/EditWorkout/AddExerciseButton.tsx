import { TouchableOpacity } from "react-native";
import Feather from '@expo/vector-icons/Feather';

import { AddExerciseButtonProps } from "./types";
import { styles } from "./styles";

export default function AddExerciseButton({ onPress }: AddExerciseButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.addExerciseButton}
        >
            <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
    )
}