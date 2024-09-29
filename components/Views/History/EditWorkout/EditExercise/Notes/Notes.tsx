import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { lightHaptic } from "@/utils/haptics/haptics";

import { updateCompletedExerciseNotes } from "@/db/queries";

import { UpdateCompletedExerciseNotesData } from "@/db/types";
import { NotesProps } from "./types";
import { styles } from "./styles";

import AnimatedLottieView from "@/components/Common/AnimatedLottieView";
import AnimatedTextInput from "@/components/Common/AnimatedTextInput";

export default function Notes({ id, notes }: NotesProps) {
    const [isEditing, setIsEditing] = useState(false);
    const notesPadding = useSharedValue(0);
    const progress = useSharedValue(0);
    const { control, handleSubmit } = useForm({
        defaultValues: {
            id: id,
            notes: notes
        }
    });

    const mutation = useMutation({
        mutationFn: updateCompletedExerciseNotes
    })

    useEffect(() => {
        progress.value = withTiming(.2, {
            duration: 500
        })
    }, []);

    const onSubmit = (data: UpdateCompletedExerciseNotesData) => {
        mutation.mutate(data);
        progress.value = withTiming(1, { duration: 1000 }, () => {
            progress.value = withTiming(.2)
        })
        notesPadding.value = withTiming(0);
        setIsEditing(false);
    }

    const startEdit = () => {
        setIsEditing(true);
        progress.value = withTiming(0.4);
        notesPadding.value = withTiming(5);
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

    const notesAnimatedStyles = useAnimatedStyle(() => ({
        padding: notesPadding.value
    }));

    return (
        <View style={styles.container}>
            <View style={styles.notesWrapper}>
                <Controller 
                    name="notes"
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <AnimatedTextInput
                            value={value ?? ""}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="Notes..."
                            style={[
                                styles.notesTextInput,
                                notesAnimatedStyles,
                                {
                                    backgroundColor: isEditing ? "rgba(0, 0, 0, .3)" : "transparent"
                                }
                            ]}
                            editable={isEditing}
                        />
                    )}
                />
            </View>
            <Pressable
                onPress={handlePress}
                style={styles.notesButtonWrapper}
            >
                    <AnimatedLottieView
                        animatedProps={animatedProps}
                        loop={false}
                        source={require("@/assets/animations/lockToSuccessAnimation.json")}
                        style={{ height: 40, width: 40 }}
                    />
            </Pressable>
        </View>
    )
}