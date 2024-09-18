import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        width: "100%"
    },
    headers: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingBottom: 5
    },
    sets: {
        backgroundColor: "rgba(73, 76, 82, 1)",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    schemaColumns: {
        flexDirection: "row"
    },
    headerText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    },
    setColumn: {
        alignItems: "flex-start",
        width: 50
    },
    timeColumn: {
        alignItems: "center",
        width: 120
    },
    weightColumn: {
        alignItems: "center",
        width: 70
    },
    repsColumn: {
        alignItems: "center",
        width: 70
    },
    throwsColumn: {
        alignItems: "center",
        width: 70
    },
    statusColumn: {
        alignItems: "flex-end",
        width: 70
    },
    textInput: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 8,
        color: "white",
        fontSize: 16,
        fontWeight: "700",
        paddingHorizontal: 5,
        paddingVertical: 3,
        textAlign: "center",
    },
    timeInput: {
        minWidth: 70
    },
    weightInput: {
        width: 70
    },
    repsInput: {
        width: 45
    },
    throwsInput: {
        width: 45
    },
    icon: {
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    set: {
        backgroundColor: "rgba(0, 0, 0, .4)",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    setText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    },
    optionsPopover: {
        backgroundColor: "rgba(73, 76, 82, 1)",
        borderRadius: 15,
        padding: 10,
        width: 200
    }
});