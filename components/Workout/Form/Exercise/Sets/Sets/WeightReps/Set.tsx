import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import Animated, { FadeInRight, FadeOutLeft, LinearTransition } from "react-native-reanimated";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { lightHaptic } from "@/utils/haptics/haptics";
import { FormValues } from "@/app/(tabs)/_layout";

import { styles } from "../styles";

interface SetProps {
    removeSet: (index: number) => void;
    set: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">;
    setIndex: number;
    exerciseIndex: number;
    control: Control<FormValues>;
}

export default function Set({ control, removeSet, set, setIndex, exerciseIndex }: SetProps) {
    return (
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
                    removeSet(setIndex);
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
                            <Text style={styles.setText}>{setIndex + 1}</Text>
                        </View>
                    </View>
                    <View style={styles.schemaColumns}>
                        <View style={styles.weightColumn}>
                            <Controller 
                                control={control}
                                name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
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
                                name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
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
        </Animated.View>
    )
}