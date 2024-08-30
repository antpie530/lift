import {
    ScrollView,
    StyleSheet,
    Text, 
    TextInput, 
    TouchableHighlight,  
    View
} from "react-native";
import { Controller, Control } from "react-hook-form";

import Header from "./Header";

import { Screen } from "../CreateExerciseForm";
import { ExerciseInsert } from "@/db/schema";
import { FieldErrors } from "react-hook-form";

interface FormViewProps {
    closeForm: () => void;
    control: Control<ExerciseInsert>;
    updateScreen: (screen: Screen) => void;
    handleSubmit: () => void;
    errors: FieldErrors<ExerciseInsert>;
    reset: () => void;
}

export default function FormView({ control, closeForm, updateScreen, handleSubmit, errors, reset }: FormViewProps) {
    return (
        <View style={{ flex: 1 }}>
            <Header closeForm={closeForm} handleSubmit={handleSubmit} reset={reset} />
            <ScrollView style={styles.content}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.textInputContainer}>
                            <TextInput
                                placeholder="Add name..."
                                style={styles.textInput}
                                returnKeyType="done"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                        </View>
                    )}
                    name="name"
                />
                <View>
                    <Controller
                        control={control}
                        render={({ field: { value } }) => (
                            <TouchableHighlight
                                onPress={() => updateScreen("Schema")}
                                style={styles.selectContainer}
                                underlayColor="rgba(50, 173, 240, .4)"
                            >
                                <View style={styles.schemaWrapper}>
                                    <Text style={styles.selectContainerText}>Schema</Text>
                                    {value && <Text style={styles.schemaValue}>{value}</Text>}
                                    {errors.schema && <Text style={styles.errorText}>{errors.schema.message}</Text>}
                                </View>
                            </TouchableHighlight>
                        )}
                        name="schema"
                    />
                    <TouchableHighlight
                        onPress={() => updateScreen("Description")}
                        style={styles.selectContainer}
                        underlayColor="rgba(50, 173, 240, .4)"
                    >
                        <Text style={styles.selectContainerText}>Description</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    textInputContainer: {
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 15,
        width: "100%"
    },
    textInput: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 5,
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        padding: 8
    },
    selectContainer: {
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 15,
        width: "100%"
    },
    selectContainerText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    },
    schemaWrapper: {
    },
    schemaValue: {
        color: "rgba(166, 166, 166, .8)",
        fontWeight: "700"
    },
    errorText: {
        color: "rgba(232, 2, 56, 1)",
        fontWeight: "700"
    }
})