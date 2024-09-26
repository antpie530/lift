import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    exerciseName: {
        color: "rgba(9, 146, 219, 1)",
        fontSize: 18,
        fontWeight: "700"
    },
    optionsPopover: {
        backgroundColor: "rgba(73, 76, 82, 1)",
        borderRadius: 15,
        padding: 10,
        width: 200
    },
    options: {
        alignItems: "center",
        backgroundColor: "rgba(9, 146, 219, .3)",
        borderRadius: 8,
        justifyContent: "center",
        paddingVertical: 0,
        paddingHorizontal: 5
    },
    popoverButton: {
        alignItems: "center",
        flexDirection: "row",
    },
    popoverButtonText: {
        color: "red",
        fontSize: 18,
        fontWeight: "600",
        paddingLeft: 5
    }
})