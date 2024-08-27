import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { 
    Extrapolation, 
    interpolate, 
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue 
} from "react-native-reanimated";
import React from "react";

interface ScreenWrapperProps {
    name: string;
    children: React.ReactNode;
}

export default function ScreenWrapper({ name, children }: ScreenWrapperProps) {
    const offsetY = useSharedValue(0);
    const topPadding = useSharedValue(useSafeAreaInsets().top);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        offsetY.value = event.contentOffset.y;
    })

    const mainHeaderAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(offsetY.value, [0, 60], [1, 0], Extrapolation.CLAMP),
        transform: [{ scale: interpolate(offsetY.value, [-200, 0], [1.2, 1], Extrapolation.CLAMP)}],
        paddingLeft: interpolate(offsetY.value, [-200, 0], [2.8 * 15, 15], Extrapolation.CLAMP)
    }));

    const secondaryHeaderAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(offsetY.value, [10, 60], [0, 1], Extrapolation.CLAMP)
    }))

    return (
        <SafeAreaView style={{ backgroundColor: "rgba(57, 60, 64, 1)", flex: 1 }}>
            <Animated.View style={[styles.secondaryHeader, secondaryHeaderAnimatedStyle, { paddingTop: topPadding }]}>
                <Text style={styles.secondaryHeaderText}>{name}</Text>
            </Animated.View>
            <Animated.ScrollView onScroll={scrollHandler}>
                <Animated.View style={[styles.mainHeader, mainHeaderAnimatedStyle]}>
                    <Text style={styles.mainHeaderText}>{name}</Text>
                </Animated.View>
                <View style={{ flex: 1 }}>
                    {children}
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainHeader: {
        paddingBottom: 24,
        paddingTop: (1.2 * 16) + (2 * 15),
        width: "100%"
    },
    mainHeaderText: {
        color: "white",
        fontSize: 32,
        fontWeight: "800"
    },
    secondaryHeader: {
        alignItems: "center",
        backgroundColor: "rgba(57, 60, 64, 1)",
        borderBottomWidth: 1,
        borderColor: "rgba(171, 171, 171, 1)",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 1
    },
    secondaryHeaderText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        paddingBottom: 10,
        paddingTop: 15
    },
})