import { COLORS } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

interface CardProps {
    title: string;
    value: number;
    unit: string;
}

export default function Card({ title, value, unit }: CardProps) {
    let fontSize;
    let lineHeight;
    let marginBottom;

    if (value >= 10000) {
        fontSize = 35;
        lineHeight = 35;
        marginBottom = -5;
    } else if (value >= 1000) {
        fontSize = 45;
        lineHeight = 45;
        marginBottom = -7;
    } else {
        fontSize = 55;
        lineHeight = 55;
        marginBottom = -8;
    }

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            layout={LinearTransition}
            style={styles.cardContainer}
        >
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.valueWrapper}>
                <Text 
                    style={[
                        styles.value,
                        {
                            fontSize: fontSize,
                            lineHeight: lineHeight,
                            marginBottom: marginBottom
                        }
                    ]}
                >
                    {value.toLocaleString()}
                </Text>
                <View style={styles.unitWrapper}>
                    <Text style={styles.unit}>{unit}</Text>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderColor: COLORS.secondary,
        borderRadius: 35,
        borderWidth: 1,
        flex: 1,
        padding: 15,
    },
    titleWrapper: {
        paddingBottom: 5,
        width: "100%"
    },
    valueWrapper: {
        flex: 1,
    },
    title: {
        color: COLORS.secondaryText,
        fontSize: 14,
        fontWeight: "700"
    },
    value: {
        alignSelf: "flex-end",
        color: COLORS.text,
        fontWeight: "800",
    },
    unitWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    unit: {
        color: COLORS.secondaryText,
        fontSize: 14,
        fontWeight: "700"
    }
});
