import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
    background: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .8)",
        justifyContent: "center",
        flex: 1
    },
    container: {
        aspectRatio: 5/7,
        backgroundColor: "rgba(80, 80, 80, 1)",
        borderRadius: 15,
        padding: 15,
        width: "95%"
    },
    headerContainer: {
        alignItems: "center",
        width: "100%"
    }
})