import { useState } from "react";
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { lightHaptic } from "@/utils/haptics/haptics";

interface NotesProps {
    index: number;
}

export default function Notes({ index }: NotesProps) {
    const [notesLocked, setNotesLocked] = useState(false);
    const { control } = useFormContext();

    return (
        <View style={styles.container}>
            <Controller 
                control={control}
                name={`exercises.${index}.notes`}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        editable={!notesLocked}
                        multiline={true}
                        style={styles.notes}
                    />
                )}
            />
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    setNotesLocked(!notesLocked);
                }}
                style={{
                    alignSelf: "flex-start",
                    backgroundColor: notesLocked ? "rgba(115, 197, 255, .5)" : "transparent",
                    borderRadius: 8,
                    paddingVertical: 4,
                    paddingHorizontal: 8
                }}
            >
                <FontAwesome6 name="lock" size={20} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: "white",
        borderBottomWidth: 1,
        flexDirection: "row",
        marginHorizontal: 15,
        paddingVertical: 5,
        width: Dimensions.get("window").width - 30
    },
    notes: {
        color: "white",
        flex: 1,
        fontSize: 18,
        fontWeight: "600",
        paddingRight: 8
    }
});