import { Text, View } from "react-native";

import { styles } from "../styles";

// add a control with a popover as the select component

export default function Header() {
    return (
        <View style={styles.headers}>
            <View style={styles.setColumn}>
                <Text style={styles.headerText}>Set</Text>
            </View>
            <View style={styles.schemaColumns}>
                <View style={styles.repsColumn}>
                    <Text style={styles.headerText}>Reps</Text>
                </View>
                <View style={styles.statusColumn}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
            </View>
        </View>
    )
}