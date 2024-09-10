import { StyleSheet, Text, TouchableHighlight } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { UseFormSetValue, Control } from "react-hook-form";
import { ExerciseInput, FormValues } from "@/app/(tabs)/_layout";

import AddExerciseButton from "../AddExerciseButton";
import CancelButton from "../CancelButton";
import Exercise from "./Exercise/Exercise";

interface FormProps {
    data: ExerciseInput[];
    openAddExercisePopUp: () => void;
    setValue: UseFormSetValue<FormValues>;
    remove: () => void;
    move: (from: number, to: number) => void;
    control: Control<FormValues>;
}

export default function Form({ remove, data, openAddExercisePopUp, setValue, control, move }: FormProps) {
    return (
        <DraggableFlatList
            data={data}
            onDragEnd={({ data, from, to }) => move(from, to)}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, drag, isActive, getIndex }) => (
                <ScaleDecorator>
                    <TouchableHighlight
                        onLongPress={drag}
                        disabled={isActive}
                        underlayColor="transparent"
                    >
                        <Exercise 
                            index={getIndex()} 
                            name={item.name} 
                            id={item.id} 
                            removeExercise={remove} 
                            control={control}    
                        />   
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