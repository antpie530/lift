import Animated, { FadeOut, LinearTransition } from "react-native-reanimated";

import { WeightRepsProps } from "../../types";

import Header from "./Header";
import Set from "./Set";

export default function WeightReps({ sets, exerciseId }: WeightRepsProps) {
    return (
        <>
            <Header />
            {sets.map((set, index) => (
                <Animated.View key={set.id} exiting={FadeOut} layout={LinearTransition}>
                    <Set id={set.id} weight={set.weight} reps={set.reps} setNumber={index + 1} exerciseId={exerciseId} />
                </Animated.View>
            ))}
        </>
    )
}