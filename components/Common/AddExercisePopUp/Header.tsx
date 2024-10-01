import { Text, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';

import { lightHaptic } from "@/utils/haptics/haptics";

import { styles } from "./styles";
import { HeaderProps } from "./types";

export default function Header({ close, selectedExerciseCount, onAdd }: HeaderProps) {
    let addButton;
    if (selectedExerciseCount > 0) {
        addButton = (
            <TouchableOpacity 
                onPress={() => {
                    lightHaptic();
                    onAdd();
                    close();
                }}
                style={styles.exitButtonWrapper}
            >
                <Text style={[styles.addButtonText, { color: "white"}]}>Add({selectedExerciseCount})</Text>
            </TouchableOpacity>
            
        )
    } else {
        addButton = (
            <View style={[styles.exitButtonWrapper, { backgroundColor: "transparent"}]}>
                <Text style={styles.addButtonText}>Add</Text>
            </View>
        )
    }

    return (
        <View style={styles.header}>
            <View style={styles.exitWrapper}>
                <TouchableOpacity
                    onPress={() => {
                        lightHaptic();
                        close();
                    }}
                    style={styles.exitButtonWrapper}
                >
                    <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.headerTextWrapper}>
                <Text style={styles.headerText}>Add Exercises</Text>
            </View>
            <View style={styles.addWrapper}>
                {addButton}
            </View>
        </View>
    )
}