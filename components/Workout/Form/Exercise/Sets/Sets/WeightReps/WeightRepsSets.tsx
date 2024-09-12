import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Control, Controller } from "react-hook-form";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { lightHaptic } from "@/utils/haptics/haptics";
import { SetType, FormValues } from "@/app/(tabs)/_layout";

interface WeightRepsSets {
    removeSet: (index: number) => void;
    sets: SetType[];
    exerciseIndex: number;
    control: Control<FormValues>;
}

export default function WeightRepsSets({ exerciseIndex, removeSet, sets, control }: WeightRepsSets) {
    return (
        <View style={styles.container}>
            <View style={styles.headers}>
                <View style={styles.setColumn}>
                    <Text style={styles.headerText}>Set</Text>
                </View>
                <View style={styles.schemaColumns}>
                    <View style={styles.weightColumn}>
                        <Text style={styles.headerText}>lbs</Text>
                    </View>
                    <View style={styles.repsColumn}>
                        <Text style={styles.headerText}>Reps</Text>
                    </View>
                    <View style={styles.statusColumn}>
                        <Text style={styles.headerText}>Status</Text>
                    </View>
                </View>
            </View>
            {sets.map((set, index) => (
                <Swipeable
                    key={index}
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
                            <View style={styles.weightColumn}>
                                <Controller 
                                    control={control}
                                    name={`exercises.${exerciseIndex}.sets.${index}.weight`}
                                    render={({ field: { onChange, onBlur, value }}) => (
                                        <TextInput
                                            keyboardType="numeric"
                                            inputMode="numeric"
                                            style={[styles.textInput, styles.weightInput]}
                                            value={value?.toString()}
                                            onChangeText={(text) => {
                                                const updatedText = text ? parseInt(text) : text;
                                                onChange(updatedText);
                                            }}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                            </View>
                            <View style={styles.repsColumn}>
                                <Controller
                                    control={control}
                                    name={`exercises.${exerciseIndex}.sets.${index}.reps`}
                                    render={({ field: { onChange, onBlur, value }}) => (
                                        <TextInput
                                            keyboardType="numeric"
                                            inputMode="numeric"
                                            style={[styles.textInput, styles.repsInput]}
                                            value={value?.toString()}
                                            onChangeText={(text) => {
                                                const updatedText = text ? parseInt(text) : text;
                                                onChange(updatedText);
                                            }}
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
    weightColumn: {
        alignItems: "center",
        width: 70
    },
    repsColumn: {
        alignItems: "center",
        width: 70
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
    weightInput: {
        width: 70
    },
    repsInput: {
        width: 45
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