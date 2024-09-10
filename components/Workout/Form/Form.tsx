import { StyleSheet, Text, TouchableHighlight } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { UseFormSetValue } from "react-hook-form";
import { ExerciseInput, FormValues } from "@/app/(tabs)/_layout";

import AddExerciseButton from "../AddExerciseButton";
import CancelButton from "../CancelButton";
import Exercise from "./Exercise/Exercise";

interface FormProps {
    data: ExerciseInput[];
    openAddExercisePopUp: () => void;
    setValue: UseFormSetValue<FormValues>;
}

export default function Form({ data, openAddExercisePopUp, setValue }: FormProps) {

    const removeExercise = (id: number) => {
        const updatedData = data.filter(exercise => exercise.id !== id);
        setValue("exercises", updatedData);
    }

    return (
        <DraggableFlatList
            data={data}
            onDragEnd={({ data }) => setValue("exercises", data)}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, drag, isActive }) => (
                <ScaleDecorator>
                    <TouchableHighlight
                        onLongPress={drag}
                        disabled={isActive}
                        underlayColor="transparent"
                    >
                        <Exercise name={item.name} id={item.id} removeExercise={removeExercise} />   
                    </TouchableHighlight>
                </ScaleDecorator>
            )}
            ListFooterComponent={() => (
                <>
                    <AddExerciseButton openAddExercisePopUp={openAddExercisePopUp}/>
                    <CancelButton />
                </>
            )}
        />
    )
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    }
})