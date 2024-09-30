import { Text, TouchableHighlight } from "react-native";

import { styles } from "./styles";
import { ExerciseItemProps } from "./types";

export default function ExerciseItem({ name, schema, selected, onPress }: ExerciseItemProps) {
    return (
        <TouchableHighlight
            onPress={onPress}
            style={[
                styles.itemContainer, 
                { backgroundColor: selected ? "rgba(50, 173, 240, 1)" : "transparent"}
            ]}
            underlayColor={"rgba(50, 173, 240, 1)"}
        >
            <>
                <Text style={styles.itemText}>{name}</Text>
                <Text style={styles.schema}>{schema}</Text>
            </>
        </TouchableHighlight>
    )
}