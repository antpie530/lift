import { Text, View } from "react-native";

import { styles } from "../styles";
import { TimeOnlyRowsProps } from "../types";

export default function TimeOnlyRows({ sets }: TimeOnlyRowsProps) {
    return (
        <>
            {sets.map((set) => (
                <View key={set.setNumber} style={styles.row}>
                    <Text style={styles.set}>Set {set.setNumber}: </Text>
                    <Text style={styles.set}>{set.time} ms</Text>
                </View>
            ))}
        </>
    );
}
