import Animated, { FadeOut, LinearTransition } from "react-native-reanimated";
import { TimeOnlyProps } from "../../types"

import Header from "./Header"
import Set from "./Set"

export default function TimeOnly({ sets, exerciseId }: TimeOnlyProps) {
    return (
        <>
            <Header />
            {sets.map((set, index) => (
                <Animated.View key={set.id} exiting={FadeOut} layout={LinearTransition}>
                    <Set id={set.id} time={set.time} setNumber={index + 1} exerciseId={exerciseId} />
                </Animated.View>
            ))}
        </>
    )
}