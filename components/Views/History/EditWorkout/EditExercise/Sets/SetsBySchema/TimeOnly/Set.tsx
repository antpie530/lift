import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { lightHaptic } from "@/utils/haptics/haptics";
import { msToSeconds, secondsToMs } from "@/utils/conversions/timeConversions";

import { updateTimeOnlySet } from "@/db/queries";

import { UpdateTimeOnlySetData } from "@/db/types";
import { TimeOnlySetProps } from "../../types";

import { styles } from "../../styles";

import AnimatedLottieView from "@/components/Common/AnimatedLottieView";
import ReactiveTextInput from "../../../../ReactiveTextInput";

export default function Set({ id, time, setNumber }: TimeOnlySetProps) {
    const [isEditing, setIsEditing] = useState(false);
    const progress = useSharedValue(0);
    const timeWidth = useSharedValue(50);
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateTimeOnlySetData>({
        defaultValues: {
            id: id,
            time: msToSeconds(time)
        }
    });

    const mutation = useMutation({
        mutationFn: updateTimeOnlySet
    });

    useEffect(() => {
        progress.value = withTiming(.2, {
            duration: 500
        });
    }, []);

    const onSubmit = (data: UpdateTimeOnlySetData) => {
        const processedData = {
            ...data,
            time: secondsToMs(data.time)
        };
        
        mutation.mutate(processedData);

        progress.value = withTiming(1, { duration: 1000 }, () => {
            progress.value = withTiming(0.2);
        });
        timeWidth.value = withTiming(50);
        setIsEditing(false);
    };

    const startEdit = () => {
        setIsEditing(true);
        progress.value = withTiming(0.4);
        timeWidth.value = withTiming(75);
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

    const animatedStyle = useAnimatedStyle(() => ({
        width: timeWidth.value
    }));

    return (
        <View style={styles.header}>
            <View style={styles.setValues}>
                <Text style={styles.headerText}>{setNumber}</Text>
            </View>
            <View style={styles.editHeaders}>
                <View style={styles.timeColumn}>
                    <Controller 
                        name="time"
                        control={control}
                        rules={{
                            required: "This field is required"
                        }}
                        render={({ field: { onBlur, onChange, value }}) => (
                            <ReactiveTextInput
                                scale={1.1}
                                rotationDegrees={15}
                                error={errors.time ? true : false}
                                value={value.toString()}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={[
                                    styles.headerText,
                                    styles.inputValues,
                                    animatedStyle,
                                    {
                                        backgroundColor: isEditing ? (errors.time ? "rgba(250, 0, 0, .4)" : "rgba(0, 0, 0, .3)") : "transparent",
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
    )
}