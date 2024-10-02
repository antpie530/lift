import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Text, View } from "react-native";

import { styles } from "./styles";
import { TimestampProps } from "./types";

export default function Timestamp({ timestamp }: TimestampProps) {
    const dateObj = new Date(timestamp);

    const date = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const time = dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return (
        <View style={styles.container} testID="timestamp-container">
            <View style={styles.iconWrapper} testID="timestamp-icon">
                <FontAwesome6 name="calendar-days" size={20} color="white" />
            </View>
            <View style={styles.timeStampWrapper}>
                <Text style={styles.date} testID="timestamp">
                    {time} {date}
                </Text>
            </View>
        </View>
    );
}
