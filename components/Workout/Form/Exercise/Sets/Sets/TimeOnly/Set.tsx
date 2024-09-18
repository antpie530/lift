import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Controller, FieldArrayWithId, useFormContext, useWatch } from "react-hook-form";
import Animated, { 
    FadeInRight,
    FadeOutLeft, 
    LinearTransition,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming 
} from "react-native-reanimated";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { errorHaptic, lightHaptic } from "@/utils/haptics/haptics";
import { FormValues } from "@/types/commonTypes";
import MaskInput from "react-native-mask-input";

import { MMSSMask, HHMMSSMask, MMSSSSMask } from "./utils";
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

    const timeFormat = useWatch({
        control,
        name: `exercises.${exerciseIndex}.schemaUnits.timeUnit`
    });

    let mask;
    switch (timeFormat) {
        case "MM:SS":
            mask = MMSSMask;
            break;
        case "HH:MM":
            mask = MMSSMask;
            break;
        case "HH:MM:SS":
            mask = HHMMSSMask;
            break;
        case "MM:SS.SS":
            mask = MMSSSSMask;
            break;
        default:
            mask = undefined;
            break;
    }

    const atMostOneDecimal = (value: string) => {
        let decimalCount = 0;
        for (const char of value) {
            if (char === ".") {
                decimalCount += 1;
            }
        }

        return decimalCount < 2;
    }

    const scaleValue = useSharedValue(1);
    const rotationValue = useSharedValue("0deg");
    const completeButtonScale = useSharedValue(1);

    const completeButtonAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: completeButtonScale.value }]
    }));

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

    const handleCompleteButtonAnimation = () => {
        completeButtonScale.value = withTiming(1.3, { duration: 300 }, () => {
            completeButtonScale.value = withTiming(1, { duration: 300 });
        })
    }

    const isValid = () => {
        const timeValue = getValues(`exercises.${exerciseIndex}.sets.${setIndex}.time`);
        if (isNaN(timeValue)) {
            return false;
        }
        if (timeValue) {
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
                handleCompleteButtonAnimation();
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
                            <View style={styles.timeColumn}>
                                <Controller
                                    control={control}
                                    name={`exercises.${exerciseIndex}.sets.${setIndex}.time`}
                                    render={({ field: { onChange, onBlur, value }}) => (
                                        <Animated.View style={animatedStyle}>
                                            <MaskInput
                                                mask={mask}
                                                keyboardType="decimal-pad"
                                                inputMode="decimal"
                                                selectTextOnFocus
                                                style={[
                                                    styles.textInput, 
                                                    styles.timeInput,
                                                    {
                                                        backgroundColor: (value || !underValidation) ? "rgba(0, 0, 0, .5)" : "rgba(250, 0, 0, .4)"
                                                    }
                                                ]}
                                                value={value}
                                                onChangeText={(text) => {
                                                    if (atMostOneDecimal(text)) {
                                                        onChange(text);
                                                    } else {
                                                        onChange(value);
                                                    }
                                                }}
                                                onBlur={onBlur}
                                                editable={!completed}
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