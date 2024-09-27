import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { lightHaptic } from "@/utils/haptics/haptics";

import { updateRepsOnlySet } from "@/db/queries";

import { UpdateRepsOnlySetData } from "@/db/types";

import { styles } from "../../styles";
import { RepsOnlySetProps } from "../../types";

import AnimatedLottieView from "@/components/Common/AnimatedLottieView";
import ReactiveTextInput from "../../../../ReactiveTextInput";

export default function Set({ id, reps, setNumber }: RepsOnlySetProps) {
    const [isEditing, setIsEditing] = useState(false);
    const progress = useSharedValue(0);
    const repsWidth = useSharedValue(45);
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateRepsOnlySetData>({
        defaultValues: {
            id: id,
            reps: reps
        }
    });

    const mutation = useMutation({
        mutationFn: updateRepsOnlySet
    })

    useEffect(() => {
        progress.value = withTiming(.2, {
            duration: 500
        });
    }, []);

    const onSubmit = (data: UpdateRepsOnlySetData) => {
        mutation.mutate(data);
        progress.value = withTiming(1, { duration: 1000 }, () => {
            progress.value = withTiming(.2)
        });
        repsWidth.value = withTiming(45);
        setIsEditing(false);
    }

    const startEdit = () => {
        setIsEditing(true);
        progress.value = withTiming(0.4);
        repsWidth.value = withTiming(50);
    }

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

    const animatedStyle = useAnimatedStyle(() => ({
        width: repsWidth.value,
    }));

    return (
        <View style={styles.header}>
            <View style={styles.setValues}>
                <Text style={styles.headerText}>{setNumber}</Text>
            </View>
            <View style={styles.editHeaders}>
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
                                    styles.repsValues,
                                    animatedStyle,
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
                    style={[styles.statusColumn]}
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
    )
}