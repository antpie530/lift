import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Control, Controller, FieldArrayWithId, UseFormGetValues, UseFormSetValue, useWatch } from "react-hook-form";
import Animated, {
    FadeInRight, 
    FadeOutLeft, 
    LinearTransition,
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    withSequence, 
    withSpring, 
    withDelay
} from "react-native-reanimated";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { errorHaptic, lightHaptic } from "@/utils/haptics/haptics";
import { FormValues } from "@/app/(tabs)/_layout";

import { styles } from "../styles";

interface SetProps {
    removeSet: (index: number) => void;
    set: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">;
    setIndex: number;
    exerciseIndex: number;
    control: Control<FormValues>;
    getValues: UseFormGetValues<FormValues>
    setValue: UseFormSetValue<FormValues>;
}

export default function Set({ setValue, getValues, control, removeSet, set, setIndex, exerciseIndex }: SetProps) {
    const [underValidation, setUnderValidation] = useState(false);
    const completed = useWatch({
        control,
        name: `exercises.${exerciseIndex}.sets.${setIndex}.completed`
    });
    const scaleValue = useSharedValue(1);
    const rotationValue = useSharedValue("0deg");

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scaleValue.value },
            { rotate: rotationValue.value }
        ]
    }));

    const handleShake = () => {
        scaleValue.value = withTiming(1.2, { duration: 100 }, () => {
            rotationValue.value = withSequence(
                withTiming("-15deg", { duration: 50 }),
                withTiming("15deg", { duration: 50 }),
                withTiming("-15deg", { duration: 50 }),
                withTiming("15deg", { duration: 50 }),
                withTiming("0deg", { duration: 50 }, () => {
                    scaleValue.value = withTiming(1, { duration: 100 })
                }),
            )
        });
    }

    const isValid = () => {
        const repsValue = getValues(`exercises.${exerciseIndex}.sets.${setIndex}.reps`);
        if (repsValue) {
            return true;
        } else {
            return false;
        }
    }

    const handleTapComplete = () => {
        const completeStatus = getValues(`exercises.${exerciseIndex}.sets.${setIndex}.completed`);

        if (completeStatus == true) {
            setUnderValidation(false);
            setValue(`exercises.${exerciseIndex}.sets.${setIndex}.completed`, false);
        } else {
            setUnderValidation(true);
            if (isValid()) {
                console.log("Change to true");
                setValue(`exercises.${exerciseIndex}.sets.${setIndex}.completed`, true);
            } else {
                errorHaptic();
                handleShake();
            }
        }
    }

    return (
        <Animated.View
            entering={FadeInRight}
            exiting={FadeOutLeft}
            layout={LinearTransition}
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
                <View style={{ backgroundColor: "rgba(73, 76, 82, 1)" }}>
                    <View 
                        style={[
                            styles.sets,
                            { backgroundColor: completed ? "rgba(14, 150, 75, .5)" : "transparent" }
                        ]}
                    >
                        <View style={styles.setColumn}>
                            <View style={styles.set}>
                                <Text style={styles.setText}>{setIndex + 1}</Text>
                            </View>
                        </View>
                        <View style={styles.schemaColumns}>
                            <View style={styles.repsColumn}>
                                <Controller
                                    control={control}
                                    name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
                                    render={({ field: { onChange, onBlur, value }}) => (
                                        <Animated.View style={animatedStyle}>
                                            <TextInput
                                                keyboardType="numeric"
                                                inputMode="numeric"
                                                editable={!completed}
                                                style={[
                                                    styles.textInput, 
                                                    styles.repsInput,
                                                    {
                                                        backgroundColor: (value || !underValidation) ? "rgba(0, 0, 0, .5)" : "rgba(250, 0, 0, .4)"
                                                    }
                                                ]}
                                                value={value?.toString()}
                                                onChangeText={(text) => {
                                                    const updatedText = text ? parseInt(text) : text;
                                                    onChange(updatedText);
                                                }}
                                                onBlur={onBlur}
                                            />
                                        </Animated.View>
                                    )}
                                />
                            </View>
                            <View style={styles.statusColumn}>
                                <TouchableOpacity
                                    onPress={() => {
                                        lightHaptic();
                                        handleTapComplete();
                                    }}
                                    style={[styles.icon, { backgroundColor: completed ? "rgba(14, 150, 75, .5)" : "rgba(0, 0, 0, .5)"}]}
                                >
                                    <Ionicons name="checkmark-sharp" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Swipeable>
        </Animated.View>
    )
}