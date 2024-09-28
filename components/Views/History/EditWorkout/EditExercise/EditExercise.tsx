import { Text } from "react-native";
import Animated, { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";

import { EditExerciseProps } from "./types";

import Header from "./Header/Header";
import Notes from "./Notes/Notes";
import Sets from "./Sets/Sets";

export default function EditExercise({ id, exerciseId, name, notes, schema, sets, onDelete }: EditExerciseProps) {
    return (
        <Animated.View entering={FadeInDown} exiting={FadeOut} layout={LinearTransition}>
            <Header name={name} exerciseId={exerciseId} onDelete={onDelete} />
            <Notes id={id} notes={notes} />
            <Sets schema={schema} sets={sets} exerciseId={exerciseId}/>
        </Animated.View>
    )
}