import { Text, View } from "react-native";

import { styles } from "../styles";
import { WeightThrowsRowsProps } from "../types";

export default function WeightThrowsRows({ sets }: WeightThrowsRowsProps) {
    return (
        <>
            {sets.map((set) => (
                <View key={set.setNumber} style={styles.row}>
                    <Text style={styles.set}>Set {set.setNumber}: </Text>
                    <Text style={styles.set}>{set.weight} g x</Text>
                    <Text style={styles.set}>{set.throws}</Text>
                </View>
            ))}
        </>
    );
}
