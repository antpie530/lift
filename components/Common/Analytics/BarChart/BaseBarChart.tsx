import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart, BarChartPropsType } from "react-native-gifted-charts";
import Animated, { FadeIn, FadeOut, LinearTransition, measure, useAnimatedRef } from "react-native-reanimated";

import { COLORS } from "@/constants/Colors";

interface BaseBarChartProps extends BarChartPropsType {
    title: string;
}

const BaseBarChart: React.FC<BaseBarChartProps> = ({
    barBorderRadius=10,
    barWidth=20,
    frontColor=COLORS.primaryGradientOne,
    gradientColor=COLORS.primary,
    hideRules=true,
    noOfSections=3,
    title,
    xAxisColor=COLORS.secondary,
    xAxisLabelTextStyle={ color: COLORS.secondary, fontSize: 14, fontWeight: "600" },
    xAxisThickness=3,
    yAxisColor=COLORS.secondary,
    yAxisTextStyle={ color: COLORS.secondary, fontSize: 14, fontWeight: "600" },
    yAxisThickness=3,
    ...props
}) => {
    const [chartWidth, setChartWidth] = useState(0);
    const ref = useAnimatedRef();

    useEffect(() => {
        const getWidth = () => {
            const width = measure(ref)?.width;
            if (width) {
                setChartWidth(width);
            }
        };

        setTimeout(getWidth, 0);
    }, [])

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            layout={LinearTransition}
            ref={ref}
            style={styles.container}
        >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <BarChart
                barBorderRadius={barBorderRadius}
                barWidth={barWidth}
                frontColor={frontColor}
                gradientColor={gradientColor}
                hideRules={hideRules}
                noOfSections={noOfSections}
                showGradient
                width={chartWidth}
                xAxisColor={xAxisColor}
                xAxisLabelTextStyle={xAxisLabelTextStyle}
                xAxisThickness={xAxisThickness}
                yAxisColor={yAxisColor}
                yAxisTextStyle={yAxisTextStyle}
                yAxisThickness={yAxisThickness}
                {...props} 
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: COLORS.secondary,
        borderRadius: 15,
        borderWidth: 1,
        paddingVertical: 15,
        width: "100%"
    },
    titleContainer: {
        alignItems: "center",
        width: "100%"
    },
    title: {
        color: COLORS.secondaryText,
        fontSize: 18,
        fontWeight: "700"
    }
})

export default BaseBarChart;