import { StyleSheet, TextInput, View } from "react-native";
import { Controller } from "react-hook-form";

import { Control } from "react-hook-form";
import { ExerciseInsert } from "@/db/schema";

interface DescriptionOptionProps {
    control: Control<ExerciseInsert>;
}

export default function DescriptionOption({ control }: DescriptionOptionProps) {
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value }}) => (
                    <View style={styles.textInputWrapper}>
                        <TextInput 
                            placeholder="Add description..."
                            multiline={true}
                            style={styles.textInput}
                            value={value ?? ""}
                            onChangeText={(onChange)}
                        />
                    </View>
                )}
                name="description"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInputWrapper: {
        flex: 1,
        padding: 15
    },
    textInput: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 5,
        color: "white",
        flex: 1,
        fontSize: 18,
        fontWeight: "700",
        padding: 8
    }
})