import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modal: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .7)",
        flex: 1,
        justifyContent: "center"
    },
    content: {
        aspectRatio: 5/9,
        backgroundColor: "rgba(80, 80, 80, 1)",
        borderRadius: 15,
        width: "95%"
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        height: 50,
        paddingHorizontal: 15,
        width: "100%"
    },
    exitButtonWrapper: {
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, .3)",
        borderRadius: 5,
        justifyContent: "center",
        padding: 3
    },
    headerTextWrapper: {
        alignItems: "center",
        flex: 2,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "800",
    },
    addButtonWrapper: {
        width: 70
    },
    addButtonText: {
        color: "rgba(250, 250, 250, .3)",
        fontSize: 18,
        fontWeight: "700"
    },
    exitWrapper: {
        alignItems: "flex-start",
        flex: 1
    },
    addWrapper: {
        alignItems: "flex-end",
        flex: 1
    },
    container: {
        alignItems: "center",
        backgroundColor: "rgba(210, 210, 210, 1)",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    textInputWrapper: {
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 10,
        flex: 1
    },
    textInput: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 10,
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        paddingHorizontal: 12,
        paddingVertical: 7,
        width: "100%"
    },
    filterAddButtonWrapper: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 8,
        padding: 5
    }
});