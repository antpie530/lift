import { Text, View } from "react-native";

import { styles } from "../styles";

export default function Header() {
    return (
        <View style={styles.headers}>
            <View style={styles.setColumn}>
                <Text style={styles.headerText}>Set</Text>
            </View>
            <View style={styles.schemaColumns}>
                <View style={styles.weightColumn}>
                    <Text style={styles.headerText}>grams</Text>
                </View>
                <View style={styles.throwsColumn}>
                    <Text style={styles.headerText}>Throws</Text>
                </View>
                <View style={styles.statusColumn}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
            </View>
        </View>
    )
}