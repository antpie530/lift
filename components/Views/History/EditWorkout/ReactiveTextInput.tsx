import { useEffect } from "react";
import { TextInput, TextInputProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSequence } from "react-native-reanimated";

import { errorHaptic } from "@/utils/haptics/haptics";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface ReactiveTextInputProps extends TextInputProps {
    error: boolean;
    scale: number;
    rotationDegrees: number;
}

export default function ReactiveTextInput({ error, scale, rotationDegrees, ...textInputProps}: ReactiveTextInputProps) {
    const scaleValue = useSharedValue(1);
    const rotationValue = useSharedValue("0deg");

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scaleValue.value },
            { rotate: rotationValue.value }
        ]
    }));
    
    const handleShake = () => {
        scaleValue.value = withTiming(scale, { duration: 100 }, () => {
            rotationValue.value = withSequence(
                withTiming(`-${rotationDegrees}deg`, { duration: 50 }),
                withTiming(`${rotationDegrees}deg`, { duration: 50 }),
                withTiming(`${rotationDegrees}deg`, { duration: 50 }),
                withTiming(`-${rotationDegrees}deg`, { duration: 50 }),
                withTiming("0deg", { duration: 50 }, () => {
                    scaleValue.value = withTiming(1, { duration: 100 })
                }),
            )
        });
    }

    useEffect(() => {
        if (error) {
            errorHaptic();
            handleShake();
        }
    }, [error]);

    return (
        <Animated.View style={animatedStyle}>
            <AnimatedTextInput
                {...textInputProps}
            />
        </Animated.View>
    )
}