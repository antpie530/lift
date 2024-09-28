import Animated, { FadeOut, LinearTransition } from "react-native-reanimated";

import { RepsOnlyProps } from "../../types";

import Header from "./Header";
import Set from "./Set";

export default function RepsOnly({ sets, exerciseId }: RepsOnlyProps) {
    return (
        <>
            <Header />
            {sets.map((set, index) => (
                <Animated.View key={set.id} exiting={FadeOut} layout={LinearTransition}>
                    <Set setNumber={index + 1} id={set.id} reps={set.reps} exerciseId={exerciseId} />
                </Animated.View>
            ))}
        </>
    )
}