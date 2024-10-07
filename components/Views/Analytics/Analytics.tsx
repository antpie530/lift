import { Dimensions, StyleSheet, SafeAreaView, View } from "react-native";
import { COLORS } from "@/constants/Colors";

import AnalyticsPageHeader from "./Header";
import TotalWorkoutsCard from "./MainVisuals/TotalWorkoutsCard";
import CardLoading from "@/components/Common/Analytics/Card/CardLoading";

export default function Analytics() {
    const barData = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
    const screenWidth = Dimensions.get("screen").width;

    return (
        <SafeAreaView style={styles.analyticsPageContainer}>
            <AnalyticsPageHeader />
            <View style={styles.cardsContainer}>
                <View style={styles.card}>
                    <TotalWorkoutsCard />
                </View>
                <View style={styles.card}>
                    <CardLoading />
                </View>
            </View>
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
