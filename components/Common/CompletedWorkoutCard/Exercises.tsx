import { Text, View } from "react-native";

import { styles } from "./styles";
import { ExercisesProp } from "./types";

export default function Exercises({ exercises }: ExercisesProp) {
    let content = "";

    for (let i = 0; i < exercises.length - 1; i++) {
        content += exercises[i].sets + "x" + exercises[i].name + ", "
    }


    content += exercises.length > 0 ? exercises[exercises.length - 1].sets + "x" + exercises[exercises.length - 1].name : "";
    return (
        <View>
            <Text style={styles.exercises}>{content}</Text>
        </View>
    )
}