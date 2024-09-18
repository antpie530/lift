import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Controller, FieldArrayWithId, useFormContext, useWatch } from "react-hook-form";
import Animated, { 
    FadeInRight, 
    FadeOutLeft, 
    LinearTransition,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withSequence
} from "react-native-reanimated";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { errorHaptic, lightHaptic } from "@/utils/haptics/haptics";
import { FormValues } from "@/types/commonTypes";

import { styles } from "../styles";

interface SetProps {
    removeSet: (index: number) => void;
    set: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">;
    setIndex: number;
    exerciseIndex: number;
}

export default function Set({ removeSet, set, setIndex, exerciseIndex }: SetProps) {
    const [underValidation, setUnderValidation] = useState(false);
    const { control, getValues, setValue } = useFormContext();
    const completed = useWatch({
        control,
        name: `exercises.${exerciseIndex}.sets.${setIndex}.completed`
    });
    const weightScaleValue = useSharedValue(1);
    const weightRotationValue = useSharedValue("0deg");
    const throwsScaleValue = useSharedValue(1);
    const throwsRotationValue = useSharedValue("0deg");
    const completeButtonScale = useSharedValue(1);

    const completeButtonAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: completeButtonScale.value }]
    }));

    const weightAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: weightScaleValue.value },
            { rotate: weightRotationValue.value }
        ]
    }));

    const throwsAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: throwsScaleValue.value },
            { rotate: throwsRotationValue.value }
        ]
    }));

    const handleShake = (scale: SharedValue, rotation: SharedValue) => {
        scale.value = withTiming(1.2, { duration: 100 }, () => {
            rotation.value = withSequence(
                withTiming("-15deg", { duration: 50 }),
                withTiming("15deg", { duration: 50 }),
                withTiming("-15deg", { duration: 50 }),
                withTiming("15deg", { duration: 50 }),
                withTiming("0deg", { duration: 50 }, () => {
                    scale.value = withTiming(1, { duration: 100 })
                }),
            )
        });
    }

    const handleCompleteButtonAnimation = () => {
        completeButtonScale.value = withTiming(1.3, { duration: 300 }, () => {
            completeButtonScale.value = withTiming(1, { duration: 300 });
        })
    }

    const isValid = (type: "weight" | "throws"): boolean => {
        const value = getValues(`exercises.${exerciseIndex}.sets.${setIndex}.${type}`);
        if (isNaN(value)) {
            return false;
        }
        return !!value || value === 0;
    }

    const handleTapComplete = () => {
        const completeStatus = getValues(`exercises.${exerciseIndex}.sets.${setIndex}.completed`);

        if (completeStatus == true) {
            setUnderValidation(false);
            setValue(`exercises.${exerciseIndex}.sets.${setIndex}.completed`, false);
        } else {
            setUnderValidation(true);
            const weightValid = isValid("weight");
            const throwsValid = isValid("throws");

            if (weightValid && throwsValid) {
                handleCompleteButtonAnimation();
                setValue(`exercises.${exerciseIndex}.sets.${setIndex}.completed`, true);
            } else {
                errorHaptic();
                if (!weightValid) {
                    handleShake(weightScaleValue, weightRotationValue);
                }
                if (!throwsValid) {
                    handleShake(throwsScaleValue, throwsRotationValue);
                }
            }
        }
    }

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
                            <View style={styles.weightColumn}>
                                <Controller 
                                    control={control}
                                    name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
                                    render={({ field: { onChange, onBlur, value }}) => (
                                        <Animated.View style={weightAnimatedStyle}>
                                            <TextInput
                                                keyboardType="numeric"
                                                inputMode="numeric"
                                                editable={!completed}
                                                selectTextOnFocus
                                                style={[
                                                    styles.textInput, 
                                                    styles.weightInput,
                                                    {
                                                        backgroundColor: (value || !underValidation || value === 0) ? "rgba(0, 0, 0, .5)" : "rgba(250, 0, 0, .4)"
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
                            <View style={styles.throwsColumn}>
                                <Controller
                                    control={control}
                                    name={`exercises.${exerciseIndex}.sets.${setIndex}.throws`}
                                    render={({ field: { onChange, onBlur, value }}) => (
                                        <Animated.View style={throwsAnimatedStyle}>
                                            <TextInput
                                                keyboardType="numeric"
                                                inputMode="numeric"
                                                editable={!completed}
                                                selectTextOnFocus
                                                style={[
                                                    styles.textInput, 
                                                    styles.throwsInput,
                                                    {
                                                        backgroundColor: (!underValidation || !isNaN(value)) ? "rgba(0, 0, 0, .5)" : "rgba(250, 0, 0, .4)"
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
                                <Animated.View style={completeButtonAnimatedStyle}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            lightHaptic();
                                            handleTapComplete();
                                        }}
                                        style={[styles.icon, { backgroundColor: completed ? "rgba(14, 150, 75, .5)" : "rgba(0, 0, 0, .5)"}]}
                                    >
                                        <Ionicons name="checkmark-sharp" size={18} color="white" />
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        </View>
                    </View>
                </View>
            </Swipeable>
        </Animated.View>
    )
}