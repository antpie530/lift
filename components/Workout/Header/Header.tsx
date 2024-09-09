import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, SharedValue, interpolate, Extrapolation } from "react-native-reanimated";

import Timer from "./Timer";
import EllapsedTime from "../EllapsedTime";
import FinishButton from "./FinishButton";

interface HeaderProps {
    headerHeight: number;
    startTime: number | undefined;
    height: SharedValue<number>;
    onFormSubmit: () => void;
}

export default function Header({ headerHeight, startTime, height, onFormSubmit }: HeaderProps) {
    const buttonAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(height.value, [650, headerHeight], [1, 0], Extrapolation.CLAMP)
    }));

    const ellapsedTimeAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(height.value, [headerHeight, 650], [1, 0], Extrapolation.CLAMP)
    }))

    return (
        <View style={[styles.container, { height: headerHeight }]}>
            <Animated.View style={[styles.restTimer, buttonAnimatedStyle]}>
                <Timer />
            </Animated.View>
            <Animated.View style={[styles.ellapsedTime, ellapsedTimeAnimatedStyle]}>
                <EllapsedTime startTime={startTime} />
            </Animated.View>
            <Animated.View style={[styles.finishButtonSection, buttonAnimatedStyle]}>
                <FinishButton onFormSubmit={onFormSubmit}/>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%"
    },
    restTimer: {
        alignItems: "flex-start",
        flex: 1,
        justifyContent: "center",
        paddingLeft: 15,
    },
    ellapsedTime: {
        alignItems: "center",
        flex: 1,
    },
    finishButtonSection: {
        alignItems: "flex-end",
        flex: 1,
        justifyContent: "center",
        paddingRight: 15
    }
})