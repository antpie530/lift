import { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { DeleteSetFromEditContext } from "@/hooks/deleteSetFromEditContext";

import { updateWeightRepsSet } from "@/db/queries";
import { SchemaTypes } from "@/types/commonTypes";

import { lightHaptic } from "@/utils/haptics/haptics";
import { gramsToPounds, poundsToGrams } from "@/utils/conversions/weightConversions";

import { UpdateWeightRepsSetData } from "@/db/types";
import { WeightRepsSetProps } from "../../types";

import { styles } from "../../styles";

import AnimatedLottieView from "@/components/Common/AnimatedLottieView";
import ReactiveTextInput from "../../../../ReactiveTextInput";
import DeleteUnderview from "../../DeleteUnderview";

export default function Set({ id, weight, reps, setNumber, exerciseId }: WeightRepsSetProps) {
    const deleteSet = useContext(DeleteSetFromEditContext).handleDeleteSet;
    const [isEditing, setIsEditing] = useState(false);
    const progress = useSharedValue(0);
    const weightWidth = useSharedValue(50);
    const repsWidth = useSharedValue(45);
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateWeightRepsSetData>({
        defaultValues: {
            id: id,
            weight: gramsToPounds(weight),
            reps: reps
        }
    });
    const mutation = useMutation({
        mutationFn: updateWeightRepsSet
    });

    useEffect(() => {
        progress.value = withTiming(.2, {
            duration: 500
        });
    }, []);

    const onSubmit = (data: UpdateWeightRepsSetData) => {
        const processedData = {
            ...data,
            weight: poundsToGrams(data.weight)
        }
        mutation.mutate(processedData);

        progress.value = withTiming(1, { duration: 1000 }, () => {
            progress.value = withTiming(0.2);
        });
        weightWidth.value = withTiming(50);
        repsWidth.value = withTiming(45);
        setIsEditing(false);
    }

    const startEdit = () => {
        setIsEditing(true);
        progress.value = withTiming(.4)
        weightWidth.value = withTiming(75);
        repsWidth.value = withTiming(50);
    };

    const handlePress = () => {
        lightHaptic();

        if (isEditing) {
            handleSubmit(onSubmit)();
        } else {
            startEdit();
        }
    }

    const animatedProps = useAnimatedProps(() => ({
        progress: progress.value
    }));

    const weightAnimatedStyle = useAnimatedStyle(() => ({
        width: weightWidth.value
    }));

    const repsAnimatedStyle = useAnimatedStyle(() => ({
        width: repsWidth.value
    }));

    return (
        <Swipeable
            enabled={isEditing}
            friction={1}
            onSwipeableOpen={() => {
                lightHaptic();
                deleteSet({
                    exerciseId: exerciseId,
                    id: id,
                    schema: SchemaTypes.WeightReps
                });
            }}
            renderRightActions={() => <DeleteUnderview />}
        >
            <View style={styles.header}>
                <View style={styles.setValues}>
                    <Text style={styles.headerText}>{setNumber}</Text>
                </View>
                <View style={styles.editHeaders}>
                    <View style={styles.weightColumn}>
                        <Controller 
                            name="weight"
                            control={control}
                            rules={{
                                required: "This fields is required",
                                pattern: {
                                    value: /^\d+(\.\d*)?$/,
                                    message: 'Please enter a valid number'
                                }
                            }}
                            render={({ field: { onBlur, onChange, value } }) => (
                                <ReactiveTextInput 
                                    scale={1.1}
                                    rotationDegrees={15}
                                    error={errors.weight ? true : false}
                                    value={value.toString()}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    style={[
                                        styles.headerText,
                                        styles.inputValues,
                                        weightAnimatedStyle,
                                        {
                                            backgroundColor: isEditing ? (errors.weight ? "rgba(250, 0, 0, .4)" : "rgba(0, 0, 0, .3)") : "transparent",
                                        }
                                    ]}
                                    editable={isEditing}
                                    returnKeyType="done"
                                    keyboardType="decimal-pad"
                                    inputMode="decimal"
                                    selectTextOnFocus
                                />
                            )}
                        />
                    </View>
                    <View style={styles.repsColumn}>
                        <Controller 
                            name="reps"
                            control={control}
                            rules={{
                                required: "This field is required",
                            }}
                            render={({ field: { onBlur, onChange, value } }) => (
                                <ReactiveTextInput
                                    scale={1.1}
                                    rotationDegrees={15}
                                    error={errors.reps ? true : false}
                                    value={value.toString()}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    style={[
                                        styles.headerText,
                                        styles.inputValues,
                                        repsAnimatedStyle,
                                        {
                                            backgroundColor: isEditing ? (errors.reps ? "rgba(250, 0, 0, .4)" : "rgba(0, 0, 0, .3)") : "transparent",
                                        }
                                    ]}
                                    editable={isEditing}
                                    returnKeyType="done"
                                    keyboardType="number-pad"
                                    inputMode="numeric"
                                    selectTextOnFocus
                                />
                            )}
                        />
                    </View>
                    <Pressable
                        onPress={handlePress}
                        style={styles.statusColumn}
                    >
                        <AnimatedLottieView
                            animatedProps={animatedProps}
                            loop={false}
                            style={{ height: 35, width: 35 }}
                            source={require("@/assets/animations/lockToSuccessAnimation.json")}
                        />
                    </Pressable>
                </View>
            </View>
        </Swipeable>
    )
}