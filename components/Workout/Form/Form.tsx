import { FlatList, StyleSheet, Text, View } from "react-native";

import { ExerciseInput } from "@/app/(tabs)/_layout";

import AddExerciseButton from "../AddExerciseButton";
import CancelButton from "../CancelButton";

interface FormProps {
    data: ExerciseInput[];
    openAddExercisePopUp: () => void;
}

export default function Form({ data, openAddExercisePopUp }: FormProps) {
    return (
        <FlatList 
            data={data}
            renderItem={({ item, index }) => (
                <View 
                    style={{
                        padding: 15,
                        borderBottomWidth: 2,
                        borderColor: "white"
                    }}
                >
                    <Text style={styles.text}>Index: {index}</Text>
                    <Text style={styles.text}>ID: {item.id}</Text>
                    <Text style={styles.text}>Name: {item.name}</Text>
                    <Text style={styles.text}>Schema: {item.schema}</Text>
                </View>
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