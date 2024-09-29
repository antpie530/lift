import Animated, { FadeOut, LinearTransition } from "react-native-reanimated";

import { WeightThrowsProps } from "../../types";

import Header from "./Header";
import Set from "./Set";

export default function WeightThrows({ sets, exerciseId }: WeightThrowsProps) {
    return (
        <>
            <Header />
            {sets.map((set, index) => (
                <Animated.View key={set.id} exiting={FadeOut} layout={LinearTransition}>
                    <Set id={set.id} weight={set.weight} throws={set.throws} setNumber={index + 1} exerciseId={exerciseId}/>
                </Animated.View>
            ))}
        </>
    )
}