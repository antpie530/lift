import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import Animated, { FadeInRight, FadeOutLeft, LinearTransition } from "react-native-reanimated";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { lightHaptic } from "@/utils/haptics/haptics";
import { FormValues } from "@/app/(tabs)/_layout";
import MaskInput, { Mask } from 'react-native-mask-input';

interface TimeOnlySetsProps {
    removeSet: (index: number) => void;
    sets: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">[]
    exerciseIndex: number;
    control: Control<FormValues>;
}

export default function TimeOnlySets({ exerciseIndex, removeSet, sets, control }: TimeOnlySetsProps) {
    const [formattedTime, setFormattedTime] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.headers}>
                <View style={styles.setColumn}>
                    <Text style={styles.headerText}>Set</Text>
                </View>
                <View style={styles.schemaColumns}>
                    <View style={styles.timeColumn}>
                        <Text style={styles.headerText}>HH:MM:SS.SS</Text>
                    </View>
                    <View style={styles.statusColumn}>
                        <Text style={styles.headerText}>Status</Text>
                    </View>
                </View>
            </View>
            {sets.map((set, index) => (
                <Animated.View
                    entering={FadeInRight}
                    exiting={FadeOutLeft}
                    layout={LinearTransition}
                    key={set.keyName}
                >
                <Swipeable
                    friction={1}
                    onSwipeableOpen={() => {
                        lightHaptic();
                        removeSet(index);
                    }}
                    renderRightActions={() => {
                        return (
                            <View style={{ alignItems: "flex-end", justifyContent: "center", flex: 1, backgroundColor: "red" }}>
                                <FontAwesome6 name="trash-can" size={24} color="white" />
                            </View>
                        )
                    }}
                >
                    <View style={styles.sets}>
                        <View style={styles.setColumn}>
                            <View style={styles.set}>
                                <Text style={styles.setText}>{index + 1}</Text>
                            </View>
                        </View>
                        <View style={styles.schemaColumns}>
                            <View style={styles.timeColumn}>
                                <Controller
                                    control={control}
                                    name={`exercises.${exerciseIndex}.sets.${index}.time`}
                                    render={({ field: { onChange, onBlur, value }}) => (
                                        <MaskInput
                                            mask={(text) => {
                                                const parts = text ? text.replace(/[^0-9]/g, '') : "";
                                                if (parts.length <= 4) {
                                                    return [/\d/, /\d/, ".", /\d/, /\d/];
                                                } else if (parts.length <= 5) {
                                                    return [/\d/, ":", /\d/, /\d/, ".", /\d/, /\d/];
                                                } else if (parts.length <= 6) {
                                                    return [/\d/, /\d/, ":", /\d/, /\d/, ".", /\d/, /\d/];
                                                } else if (parts.length <= 7) {
                                                    return [/\d/, ":", /\d/, /\d/, ":", /\d/, /\d/, ".", /\d/, /\d/];
                                                } else {
                                                    return [/\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/, ".", /\d/, /\d/];
                                                }
                                            }}
                                            keyboardType="numeric"
                                            inputMode="numeric"
                                            style={[styles.textInput, styles.timeInput]}
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                            </View>
                            <View style={styles.statusColumn}>
                                <TouchableOpacity
                                    onPress={() => {
                                        lightHaptic();
                                    }}
                                    style={[styles.icon, { backgroundColor: "rgba(0, 0, 0, .5)"}]}
                                >
                                    <Ionicons name="checkmark-sharp" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Swipeable>
                </Animated.View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        width: "100%"
    },
    headers: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingBottom: 5
    },
    sets: {
        backgroundColor: "rgba(73, 76, 82, 1)",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingBottom: 5
    },
    schemaColumns: {
        flexDirection: "row"
    },
    headerText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    },
    setColumn: {
        alignItems: "flex-start",
        width: 50
    },
    timeColumn: {
        alignItems: "center",
        width: 120
    },
    statusColumn: {
        alignItems: "flex-end",
        width: 70
    },
    textInput: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 8,
        color: "white",
        fontSize: 16,
        fontWeight: "700",
        paddingHorizontal: 5,
        paddingVertical: 3,
        textAlign: "center",
    },
    timeInput: {
        minWidth: 70
    },
    icon: {
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    set: {
        backgroundColor: "rgba(0, 0, 0, .4)",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    setText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    }
});