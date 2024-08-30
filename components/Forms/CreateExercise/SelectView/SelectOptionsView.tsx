import { View } from "react-native";

import Header from "./Header";
import SchemaOptions from "./SchemaOptions";
import DescriptionOption from "./DescriptionOption";

import { Control } from "react-hook-form";
import { Screen } from "../CreateExerciseForm";
import { ExerciseInsert } from "@/db/schema";

interface SelectOptionsViewProps {
    screen: Screen;
    control: Control<ExerciseInsert>;
    updateScreen: (screen: Screen) => void;
    setValue: (field: "id" | "name" | "schema" | "description" | "hidden", value: string) => void;
}

export default function SelectOptionsView({ screen, control, updateScreen, setValue }: SelectOptionsViewProps) {
    return (
        <View style={{ flex: 1 }}>
            <Header label={screen} updateScreen={updateScreen} />
            {screen == "Schema" && <SchemaOptions setValue={setValue} updateScreen={updateScreen} />}
            {screen == "Description" && <DescriptionOption control={control} />}
        </View>
    )
}