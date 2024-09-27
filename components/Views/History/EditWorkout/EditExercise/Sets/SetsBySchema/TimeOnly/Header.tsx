import { Text, View } from "react-native";

import { styles } from "../../styles";

export default function Header() {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>Set</Text>
            </View>
            <View style={styles.editHeaders}>
                <View style={styles.timeColumn}>
                    <Text style={styles.headerText}>Seconds</Text>
                </View>
                <View style={[styles.statusColumn]}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
            </View>
        </View>
    )
}