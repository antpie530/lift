import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { lightHaptic } from "@/utils/haptics/haptics";

import { createExercise } from "@/db/queries";

import FormView from "./FormView/FormView";
import SelectOptionsView from "./SelectView/SelectOptionsView";
import { ExerciseInsert, exerciseInsertSchema } from "@/db/schema";

export type Screen = "Schema" | "Inputs" | "Description";

interface CreateExerciseFormProps {
    showForm: boolean;
    closeForm: () => void;
}

export default function CreateExerciseForm({ showForm, closeForm }: CreateExerciseFormProps) {
    const [width, setWidth] = useState(0);
    const [screen, setScreen] = useState<Screen>("Inputs");
    const offsetX = useSharedValue(0);
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<ExerciseInsert>({
        resolver: zodResolver(exerciseInsertSchema)
    })

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: ExerciseInsert) => createExercise(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exercises"]});
        }
    });

    const onSubmit = (data: ExerciseInsert) => {
        console.log(data);
        mutation.mutate(data);
        reset();
        closeForm();
    }

    const setValueCaller = (field: "id" | "name" | "schema" | "description" | "hidden", value: string) => setValue(field, value);

    const updateScreen = (newScreen: Screen) => {
        lightHaptic();
        setScreen(newScreen);
        if (newScreen == "Inputs") {
            offsetX.value = withTiming(0);
        } else {
            offsetX.value = withTiming(-width)
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showForm}
        >
            <View style={styles.modalBackground}>
                <View 
                    style={styles.formContainer} 
                    onLayout={(event) => {
                        setWidth(event.nativeEvent.layout.width);
                    }}
                >
                    <Animated.View style={[
                        styles.viewWrapper,
                        { transform: [{ translateX: offsetX }]}
                    ]}>
                        <View style={[styles.viewContainer]}>
                            <FormView 
                                closeForm={closeForm} 
                                updateScreen={updateScreen} 
                                control={control}
                                handleSubmit={handleSubmit(onSubmit)}
                                errors={errors}
                                reset={reset}
                            />
                        </View>
                        <View style={[styles.viewContainer]}>
                            <SelectOptionsView setValue={setValueCaller} screen={screen} updateScreen={updateScreen} control={control} />
                        </View>
                    </Animated.View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .7)",
        justifyContent: "center",
        flex: 1
    },
    formContainer: {
        aspectRatio: 5/4,
        backgroundColor: "rgba(80, 80, 80, 1)",
        borderRadius: 15,
        overflow: "hidden",
        width: "95%"
    },
    viewWrapper: {
        flexDirection: "row",
        height: "100%",
        width: "100%"
    },
    viewContainer: {
        height: "100%",
        width: "100%"
    }
})