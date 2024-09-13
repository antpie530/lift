import { Text, TouchableOpacity, View } from "react-native";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import Animated, { FadeInRight, FadeOutLeft, LinearTransition } from "react-native-reanimated";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { lightHaptic } from "@/utils/haptics/haptics";
import { FormValues } from "@/app/(tabs)/_layout";
import MaskInput from "react-native-mask-input";

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
                        <View style={styles.timeColumn}>
                            <Controller
                                control={control}
                                name={`exercises.${exerciseIndex}.sets.${setIndex}.time`}
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
    )
}