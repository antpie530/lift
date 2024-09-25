import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import LottieView from "lottie-react-native";

import { UpdateWorkoutData } from "@/db/types";

import { lightHaptic } from "@/utils/haptics/haptics";

import ReactiveTextInput from "./ReactiveTextInput";
import { updateWorkout } from "@/db/queries";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

interface MetaFieldsProps {
    id: number;
    name: string;
    notes: string | null;
}

export default function MetaFields({ id, name, notes }: MetaFieldsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const progress = useSharedValue(0);
    const namePadding = useSharedValue(0);
    const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateWorkoutData>({
        defaultValues: {
            id: id,
            name: name,
            notes: notes
        }
    });
    const mutation = useMutation({
        mutationFn: updateWorkout
    })

    useEffect(() => {
        progress.value = withTiming(0.2, {
            duration: 500
        })
    }, []);

    const onSubmit = (data: UpdateWorkoutData) => {
        mutation.mutate(data);
        progress.value = withTiming(1, { duration: 1000 }, () => {
            progress.value = withTiming(.2)
        })
        namePadding.value = withTiming(0);
        setIsEditing(false);
    }

    const startEdit = () => {
        setIsEditing(true);
        progress.value = withTiming(0.4);
        namePadding.value = withTiming(5);
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

    const animatedNamePadding = useAnimatedStyle(() => ({
        padding: namePadding.value
    }));

    return (
        <View style={styles.container}>
            <View style={styles.formFields}>
                <Controller 
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <ReactiveTextInput
                            error={errors.name ? true : false}
                            scale={1.02}
                            rotationDegrees={5}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={[
                                styles.name,
                                animatedNamePadding,
                                {
                                    backgroundColor: isEditing ? (errors.name ? "rgba(250, 0, 0, .4)" : "rgba(0, 0, 0, .3)") : "transparent",
                                }
                            ]}
                            returnKeyType="done"
                            editable={isEditing}
                        />
                    )}
                />
                <Controller 
                    name="notes"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <ReactiveTextInput
                                error={errors.notes ? true : false}
                                scale={1.02}
                                rotationDegrees={5}
                                value={value ?? ""}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={[
                                    styles.notes,
                                    {
                                        backgroundColor: isEditing ? (errors.name ? "rgba(250, 0, 0, .4)" : "rgba(0, 0, 0, .3)") : "transparent",
                                        paddingHorizontal: isEditing ? 5 : 0,
                                        paddingVertical: isEditing ? 10 : 0,
                                        marginVertical: isEditing ? 4 : 0
                                    }
                                ]}
                                returnKeyType="done"
                                editable={isEditing}
                            />
                        </View>
                    )}
                />
            </View>
            <Pressable
                onPress={handlePress}
                style={styles.lockSuccessButton}
            >
                <AnimatedLottieView
                    loop={false}
                    animatedProps={animatedProps}
                    style={{ height: 50, width: 50 }}
                    source={require("@/assets/animations/lockToSuccessAnimation.json")}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    },
    formFields: {
        width: "80%"
    },
    name: {
        borderRadius: 10,
        color: "white",
        fontSize: 28,
        fontWeight: "800",
    },
    notes: {
        borderRadius: 8,
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },
    lockSuccessButton: {
        alignSelf: "flex-start"
    }
})