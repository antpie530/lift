import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    exerciseHistoryContainer: {
        flex: 1,
    },
    exerciseHistoryCards: {
        flex: 1,
        paddingHorizontal: 15,
    },
    exerciseHistoryCard: {
        borderColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        margin: 15,
        padding: 15,
    },
    timestamp: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        paddingVertical: 5,
    },
    set: {
        color: "rgba(190, 190, 190, 1)",
        fontSize: 16,
        fontWeight: "600",
        marginRight: 5,
    },
});
