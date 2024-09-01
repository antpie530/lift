import { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

import { lightHaptic } from "@/utils/haptics/haptics";

import { Exercise } from "@/db/schema";

interface EditExerciseFormProps {
    showForm: boolean;
    closeForm: () => void;
    exercise: Exercise;
}

interface data {
    name: string;
    description: string | null | undefined;
}

export default function EditExerciseForm({ exercise, showForm, closeForm }: EditExerciseFormProps) {
    const [width, setWidth] = useState(0);
    const offset = useSharedValue(0);
    
    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: exercise.name,
            description: exercise.description
        }
    });

    const onSubmit = (data: data) => {
        console.log("Submiting data:", data);
        lightHaptic();
        reset();
        closeForm();
    }

    const showDescription = () => {
        offset.value = withTiming(-width);
    }

    const showMainForm = () => {
        offset.value = withTiming(0);
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showForm}
        >
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "rgba(0, 0, 0, .8)" }}>
                <View 
                    onLayout={(event) => {
                        setWidth(event.nativeEvent.layout.width);
                    }}
                    style={{ aspectRatio: 5/4, width: "95%", backgroundColor: "rgba(80, 80, 80, 1)", borderRadius: 15, overflow: "hidden" }}
                >
                    <Animated.View style={[styles.viewsWrapper, { transform: [{ translateX: offset }]}]}>
                        <View style={styles.formView}>
                            <View style={styles.header}>
                                <TouchableOpacity
                                    onPress={() => {
                                        lightHaptic();
                                        closeForm();
                                    }}
                                    style={styles.exitButtonWrapper}
                                >
                                    <Feather name="x" size={24} color="white" />
                                </TouchableOpacity>
                                <Text style={styles.headerText}>Edit Exercise</Text>
                                <TouchableOpacity
                                    onPress={handleSubmit(onSubmit)}
                                    style={styles.exitButtonWrapper}
                                >
                                    <Text style={styles.save}>Save</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={styles.mainForm}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={styles.textInputWrapper}>
                                            <TextInput 
                                                style={styles.textInput}
                                                placeholder="Add name..."
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                            {errors.name && <Text>{errors.name.message}</Text>}
                                        </View>
                                    )}
                                    name="name"
                                />
                                <View style={styles.selectContainer}>
                                    <View style={styles.schemaWrapper}>
                                        <Text style={styles.selectContainerText}>Schema</Text>
                                        <Text style={styles.schemaValue}>{exercise.schema}</Text>
                                    </View>
                                </View>
                                <TouchableHighlight
                                    onPress={() => {
                                        lightHaptic();
                                        showDescription();
                                    }}
                                    style={styles.selectContainer}
                                    underlayColor="rgba(50, 173, 240, .4)"
                                >
                                    <Text style={styles.selectContainerText}>Description</Text>
                                </TouchableHighlight>
                            </ScrollView>
                        </View>
                        <View style={styles.descriptionView}>
                            <View style={styles.header}>
                                <TouchableOpacity
                                    onPress={() => {
                                        lightHaptic();
                                        showMainForm();
                                    }}
                                    style={styles.backButtonWrapper}
                                >
                                    <Ionicons name="arrow-back" size={24} color="white" />
                                </TouchableOpacity>
                                <Text style={styles.headerText}>Description</Text>
                                <View style={[styles.backButtonWrapper, { opacity: 0 }]}>
                                    <Ionicons name="arrow-back" size={24} color="white" />
                                </View>
                            </View>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value }}) => (
                                    <View style={styles.descInputWrapper}>
                                        <TextInput 
                                            placeholder="Add description..."
                                            multiline={true}
                                            style={styles.descInput}
                                            value={value ?? ""}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                        />
                                        {errors.description && <Text>{errors.description.message}</Text>}
                                    </View>
                                )}
                                name="description"
                            />
                        </View>
                    </Animated.View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    viewsWrapper: {
        height: "100%",
        flexDirection: "row",
        width: "100%"
    },
    formView: {
        height: "100%",
        width: "100%"
    },
    descriptionView: {
        height: "100%",
        width: "100%"
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        height: 50,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "800",
    },
    exitButtonWrapper: {
        backgroundColor: "rgba(255, 255, 255, .3)",
        borderRadius: 5,
        justifyContent: "center"
    },
    save: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
        padding: 4
    },
    mainForm: {
        flex: 1
    },
    textInputWrapper: {
        paddingHorizontal: 15
    },
    textInput: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 5,
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        padding: 8
    },
    selectContainer: {
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 15,
        width: "100%"
    },
    selectContainerText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    },
    schemaWrapper: {
    },
    schemaValue: {
        color: "rgba(166, 166, 166, .8)",
        fontWeight: "700"
    },
    descInputWrapper: {
        flex: 1,
        padding: 15
    },
    descInput: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 5,
        color: "white",
        flex: 1,
        fontSize: 18,
        fontWeight: "700",
        padding: 8
    },
    backButtonWrapper: {
        backgroundColor: "rgba(255, 255, 255, .3)",
        borderRadius: 5,
        padding: 2.5
    }
})