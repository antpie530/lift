import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    transparentBackground: {
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .8)",
        flex: 1,
        justifyContent: "center"
    },
    detailsBackground: {
        aspectRatio: 5/9,
        backgroundColor: "rgba(80, 80, 80, 1)",
        borderRadius: 15,
        width: "95%"
    },
    detailsHeader: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 15
    },
    detailsHeaderText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    },
    navigator: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
    descriptionContainer: {
        flex: 1,
        padding: 15
    },
    descriptionSchemaWrapper: {
        paddingBottom: 12
    },
    descriptionSchemaLabel: {
        color: "white",
        fontSize: 24,
        fontWeight: "700",
        marginRight: 10
    },
    descriptionSchemaValue: {
        color: "rgba(200, 200, 200, 1)",
        fontSize: 16,
        fontWeight: "600"
    },
    descriptionLabel: {
        color: "white",
        fontSize: 24,
        fontWeight: "700",
        marginRight: 10
    },
    descriptionValue: {
        color: "rgba(200, 200, 200, 1)",
        fontSize: 16,
        fontWeight: "600"
    }
})