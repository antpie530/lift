import { StyleSheet, Text, TouchableHighlight } from "react-native";

import { lightHaptic } from "@/utils/haptics/haptics";

import { Screen } from "../CreateExerciseForm";

interface SchemaOptionProps {
    name: string;
    setValue: (field: "id" | "name" | "schema" | "description" | "hidden", value: string) => void;
    updateScreen: (screen: Screen) => void;
}

export default function SchemaOption({ name, setValue, updateScreen }: SchemaOptionProps) {
    return (
        <TouchableHighlight
            onPress={() => {
                lightHaptic();
                setValue("schema", name);
                updateScreen("Inputs");
            }}
            style={styles.wrapper}
            underlayColor="rgba(50, 173, 240, .4)"
        >
            <Text style={styles.text}>{name}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    }
})