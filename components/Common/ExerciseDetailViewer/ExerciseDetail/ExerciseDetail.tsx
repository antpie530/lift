import { useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";

import TabNavigator from "./utils/TabNavigator/TabNavigator";
import ExerciseAnalytics from "./ExerciseAnalytics";
import ExerciseHistory from "./ExerciseHistory";
import ExerciseDescription from "./ExerciseDescription";

export type ActiveTab = "Analytics" | "History" | "Description";

interface ExerciseDetailProps {
    showDetails: boolean;
    closeDetails: () => void;
    openForm: () => void;
}

export default function ExerciseDetail({ showDetails, closeDetails, openForm }: ExerciseDetailProps) {
    const [activeTab, setActiveTab] = useState<ActiveTab>("Description");

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showDetails}
        >
            <View style={styles.transparentBackground}>
                <View style={styles.detailsBackground}>
                    <View style={styles.header}>
                        <Button title="Exit" onPress={closeDetails} />
                        <Text style={styles.headerText}>Exercise Details</Text>
                        <Button title="Edit" onPress={openForm} />
                    </View>
                    <View style={styles.navigator}>
                        <TabNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
                    </View>

                    {activeTab == "Analytics" && <ExerciseAnalytics />}
                    {activeTab == "History" && <ExerciseHistory />}
                    {activeTab == "Description" && <ExerciseDescription />}

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    transparentBackground: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .8)",
        flex: 1,
        justifyContent: "center"
    },
    detailsBackground: {
        aspectRatio: 5/9,
        backgroundColor: "white",
        borderRadius: 15,
        width: "95%"
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 15
    },
    headerText: {
        fontSize: 18,
        fontWeight: "700"
    },
    navigator: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    }
})