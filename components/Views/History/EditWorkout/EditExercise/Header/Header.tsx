import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { lightHaptic } from "@/utils/haptics/haptics";

import { HeaderProps } from "./types";
import { styles } from "./styles";

import ExerciseDetailViewer from "@/components/Common/ExerciseDetailViewer/ExerciseDetailViewer";
import OptionsButton from "./OptionsButton";

export default function Header({ name, exerciseId, onDelete }: HeaderProps) {
    const [showDetilView, setshowDetailView] = useState(false);

    const handleExercisePress = () => {
        lightHaptic();
        setshowDetailView(true);
    }

    return (
        <View style={styles.headerContainer}>
            <ExerciseDetailViewer 
                id={exerciseId} 
                showDetails={showDetilView} 
                setShowDetails={setshowDetailView}
            />
            <TouchableOpacity onPress={handleExercisePress}>
                <Text style={styles.exerciseName}>{name}</Text>
            </TouchableOpacity>
            <OptionsButton onDelete={onDelete} />
        </View>
    )
}