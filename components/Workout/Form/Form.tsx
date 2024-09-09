import { StyleSheet, Text, TouchableHighlight } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { UseFormSetValue } from "react-hook-form";
import { ExerciseInput, FormValues } from "@/app/(tabs)/_layout";

import AddExerciseButton from "../AddExerciseButton";
import CancelButton from "../CancelButton";

interface FormProps {
    data: ExerciseInput[];
    openAddExercisePopUp: () => void;
    setValue: UseFormSetValue<FormValues>;
}

export default function Form({ data, openAddExercisePopUp, setValue }: FormProps) {
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
                        style={{
                            padding: 15,
                            borderBottomWidth: 2,
                            borderColor: "white"
                        }}
                        underlayColor="transparent"
                    >
                        <>
                            <Text style={styles.text}>Index:</Text>
                            <Text style={styles.text}>ID: {item.id}</Text>
                            <Text style={styles.text}>Name: {item.name}</Text>
                            <Text style={styles.text}>Schema: {item.schema}</Text>
                        </>
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