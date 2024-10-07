import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/constants/Colors";

export default function AnalyticsPageHeader() {
    return (
        <View style={styles.headerWrapper}>
            <Text style={styles.headerText}>Analytics</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        paddingHorizontal: 15,
    },
    headerText: {
        color: COLORS.text,
        fontSize: 32,
        fontWeight: "800",
    },
});
