import { Text, View } from "react-native";

import { styles } from "../styles";

export default function Header() {
    return (
        <View style={styles.headers}>
            <View style={styles.setColumn}>
                <Text style={styles.headerText}>Set</Text>
            </View>
            <View style={styles.schemaColumns}>
                <View style={styles.timeColumn}>
                    <Text style={styles.headerText}>HH:MM:SS.SS</Text>
                </View>
                <View style={styles.statusColumn}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
            </View>
        </View>
    )
}