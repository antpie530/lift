import { StyleSheet, Text, View } from "react-native";

export default function ListHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>History</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10
    },
    text: {
        color: "white",
        fontSize: 32,
        fontWeight: "800"
    }
})