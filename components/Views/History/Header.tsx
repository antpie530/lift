import { StyleSheet, Text } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

interface HeaderProps {
    name: string;
    animatedHeaderStyle: AnimatedStyle;
}

export default function Header({ name, animatedHeaderStyle }: HeaderProps) {
    return (
        <>
            <Animated.View style={[styles.appearingHeader, animatedHeaderStyle]}>
                <Text style={styles.appearingHeaderText}>{name}</Text>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    appearingHeader: {
        alignItems: "center",
        backgroundColor: "black",
        justifyContent: "center",
        paddingVertical: 10,
        width: "100%"
    },
    appearingHeaderText: {
        color: "white",
        fontSize: 18,
        fontWeight: "800"
    }
});