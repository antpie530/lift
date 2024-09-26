import { Text } from "react-native";
import Animated, { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";

import { EditExerciseProps } from "./types";

import Header from "./Header/Header";

export default function EditExercise({ id, exerciseId, name, notes, schema, sets, onDelete }: EditExerciseProps) {
    return (
        <Animated.View entering={FadeInDown} exiting={FadeOut} layout={LinearTransition}>
            <Header name={name} exerciseId={exerciseId} onDelete={onDelete} />
            <Text>Notes</Text>
            <Text>Sets</Text>
        </Animated.View>
    )
}