import { StyleSheet, View } from "react-native";

export default function TopTab() {
    return (
        <View style={styles.container}>
            <View style={styles.tab}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        width: "100%"
    },
    tab: {
        borderColor: "rgba(235, 235, 235, .9)",
        borderRadius: 8,
        borderWidth: 3,
        width: "30%"
    }
})