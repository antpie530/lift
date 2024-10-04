import { Text, View } from "react-native";

import { gramsToPounds } from "@/utils/conversions/weightConversions";

import { styles } from "../styles";
import { WeightRepsRowsProps } from "../types";

export default function WeightRepsRows({ sets }: WeightRepsRowsProps) {
    return (
        <>
            {sets.map((set) => (
                <View key={set.setNumber} style={styles.row}>
                    <Text style={styles.set}>Set {set.setNumber}: </Text>
                    <Text style={styles.set}>
                        {gramsToPounds(set.weight)} lbs x
                    </Text>
                    <Text style={styles.set}>{set.reps}</Text>
                </View>
            ))}
        </>
    );
}
