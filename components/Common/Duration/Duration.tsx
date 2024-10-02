import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Text, View } from "react-native";

import { styles } from "./styles";
import { DurationProps } from "./types";

export default function Duration({ duration }: DurationProps) {
    const durationMinutes = Math.floor(duration / 60000);

    return (
        <View style={styles.container} testID="duration">
            <View style={styles.iconWrapper} testID="duration-clock-icon">
                <FontAwesome6 name="clock" size={20} color="white" />
            </View>
            <Text style={styles.duration} testID="duration-output">
                {durationMinutes} {durationMinutes < 2 ? "min" : "mins"}
            </Text>
        </View>
    );
}
