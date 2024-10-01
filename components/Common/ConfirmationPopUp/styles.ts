import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        position: "relative",
        width: "100%"
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center"
    },
    exitButtonWrapper: {
        backgroundColor: "rgba(255, 255, 255, .3)",
        borderRadius: 5,
        justifyContent: "center"
    },
    modalBackground: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .8)",
        height: "100%",
        justifyContent: "center",
        width: "100%"
    },
    popup: {
        aspectRatio: 5/4,
        backgroundColor: "rgba(80, 80, 80, 1)",
        borderRadius: 15,
        overflow: "hidden",
        width: "95%"
    },
    body: {
        alignItems: "center",
        flex: 1,
    },
    bodyText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        padding: 15
    },
    confirmButton: {
        alignItems: "center",
        backgroundColor: "rgba(255, 0, 0, .7)",
        borderRadius: 15,
        padding: 15,
        width: "80%"
    },
    confirmButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "800"
    }
});