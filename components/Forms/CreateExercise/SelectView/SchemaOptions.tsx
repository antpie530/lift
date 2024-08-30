import { StyleSheet, ScrollView } from "react-native";

import SchemaOption from "./SchemaOption";

import { exerciseInsertSchema } from "@/db/schema";
import { Screen } from "../CreateExerciseForm";

interface SchemaOptionsProps {
    setValue: (field: "id" | "name" | "schema" | "description" | "hidden", value: string) => void;
    updateScreen: (screen: Screen) => void;
}

export default function SchemaOptions({ setValue, updateScreen }: SchemaOptionsProps) {
    const options = exerciseInsertSchema.shape.schema.options;

    return (
        <ScrollView style={styles.container}>
            {options.map(name => <SchemaOption key={name} name={name} setValue={setValue} updateScreen={updateScreen} />)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})