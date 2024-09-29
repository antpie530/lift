import { StyleSheet, Text, TouchableHighlight } from "react-native";

interface ExerciseItemProps {
    name: string,
    schema: string,
    selected: boolean,
    onPress: () => void;
}

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
});