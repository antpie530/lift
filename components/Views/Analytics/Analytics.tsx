import { Dimensions, StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import { COLORS } from "@/constants/Colors";

import AnalyticsPageHeader from "./Header";
import TotalWorkoutsCard from "./MainVisuals/TotalWorkoutsCard";
import CardLoading from "@/components/Common/Analytics/Card/CardLoading";
import TotalCompletedExercisesCard from "./MainVisuals/TotalCompletedExercisesCard";
import AverageWorkoutDurationCard from "./MainVisuals/AverageWorkoutDurationCard";
import WorkoutCountByWeek from "./MainVisuals/WorkoutCountByWeek";
import MaxRepsCard from "@/components/Common/Analytics/SchemaSpecificVisuals/RepsOnly/MaxRepsCard";

export default function Analytics() {
    const screenWidth = Dimensions.get("screen").width;

    return (
        <SafeAreaView style={styles.analyticsPageContainer}>
            <AnalyticsPageHeader />
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                <View style={styles.card}>
                    <TotalWorkoutsCard />
                </View>
                <View style={styles.card}>
                    <TotalCompletedExercisesCard />
                </View>
                <View style={styles.card}>
                    <AverageWorkoutDurationCard />
                </View>
                <View style={styles.card}>
                    <CardLoading />
                </View>
                <View style={styles.card}>
                    <MaxRepsCard exerciseId={3}/>
                </View>
                <WorkoutCountByWeek 
                    width={screenWidth}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    analyticsPageContainer: {
        backgroundColor: COLORS.primaryBackground,
        flex: 1,
    },
    cardsContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 15
    },
    card: {
        aspectRatio: 1/1,
        marginBottom: 15,
        width: "48%"
    }
});
