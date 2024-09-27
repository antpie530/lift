import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: "100%"
    },
    headerText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    },
    editHeaders: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    statusColumn: {
        alignItems: "flex-end",
        width: 60
    },
    repsColumn: {
        alignItems: "center",
        justifyContent: "center",
        width: 100
    },
    timeColumn: {
        alignItems: "center",
        justifyContent: "center",
        width: 150
    },
    weightColumn: {
        alignItems: "center",
        justifyContent: "center",
        width: 150
    },
    inputValues: {
        borderRadius: 8,
        paddingHorizontal: 1,
        paddingVertical: 3,
        textAlign: "center"
    },
    setValues: {
        alignSelf: "center",
        backgroundColor: "rgba(0, 250, 0, .2)",
        borderRadius: 8,
        paddingHorizontal: 7,
        paddingVertical: 2
    }
});