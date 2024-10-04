import { Text, View } from "react-native";

import { styles } from "../styles";
import { RepsOnlyRowsProps } from "../types";

export default function RepsOnlyRows({ sets }: RepsOnlyRowsProps) {
    return (
        <>
            {sets.map((set) => (
                <View key={set.setNumber} style={styles.row}>
                    <Text style={styles.set}>Set {set.setNumber}: </Text>
                    <Text style={styles.set}>{set.reps} reps</Text>
                </View>
            ))}
        </>
    );
}
