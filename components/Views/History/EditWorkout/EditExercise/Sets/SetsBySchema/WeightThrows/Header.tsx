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