import { StyleSheet, Text, TextInput, View } from "react-native"
import { Control, Controller } from "react-hook-form";
import { FormValues } from "@/app/(tabs)/_layout";

import EllapsedTime from "../EllapsedTime";

interface FormHeaderProps {
    control: Control<FormValues>;
    startTime: number;
}

export default function FormHeader({ control, startTime }: FormHeaderProps) {
    return (
        <View>
            <View style={styles.nameWrapper}>
                <Controller 
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput 
                            style={styles.name}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
            </View>
            <View style={styles.ellapsedTimeWrapper}>
                <EllapsedTime startTime={startTime}/>
            </View>
            <View style={styles.notesWrapper}>
                <Text style={styles.notesLabel}>Notes</Text>
                <Controller 
                    control={control}
                    name="notes"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput 
                            style={styles.notes}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    nameWrapper: {
        paddingHorizontal: 15
    },
    name: {
        color: "white",
        fontSize: 32,
        fontWeight: "800"
    },
    ellapsedTimeWrapper: {
        paddingHorizontal: 15
    },
    notesWrapper: {
        paddingHorizontal: 15
    },
    notesLabel: {
        color: "white",
        fontSize: 24,
        fontWeight: "800"
    },
    notes: {
        color: "white",
        fontSize: 20,
        fontWeight: "700"
    }
})