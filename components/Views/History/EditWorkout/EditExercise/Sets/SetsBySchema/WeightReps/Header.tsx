import { Text, View } from "react-native";

import { styles } from "../../styles";

export default function Header() {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>Set</Text>
            </View>
            <View style={styles.editHeaders}>
                <View style={styles.weightColumn}>
                    <Text style={styles.headerText}>lbs</Text>
                </View>
                <View style={styles.repsColumn}>
                    <Text style={styles.headerText}>Reps</Text>
                </View>
                <View style={[styles.statusColumn]}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
            </View>
        </View>
    )
}