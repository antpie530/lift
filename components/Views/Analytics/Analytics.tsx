import { Dimensions, StyleSheet, SafeAreaView, View } from "react-native";
import { COLORS } from "@/constants/Colors";

import AnalyticsPageHeader from "./Header";
import BaseBarChart from "@/components/Common/Analytics/BarChart/BaseBarChart";
import Card from "@/components/Common/Analytics/Card/Card";

export default function Analytics() {
    const barData = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
    const screenWidth = Dimensions.get("screen").width;

    return (
        <SafeAreaView style={styles.analyticsPageContainer}>
            <AnalyticsPageHeader />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    analyticsPageContainer: {
        backgroundColor: COLORS.primaryBackground,
        flex: 1,
    },
    cardsContainer: {
        borderWidth: 1,
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    card: {
        aspectRatio: 1/1,
        marginBottom: 15,
        width: "48%"
    }
});
