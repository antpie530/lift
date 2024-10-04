import { Text } from "react-native";

import { TimestampOnlyProps } from "./types";

export default function TimestampOnly({
    timestamp,
    style,
}: TimestampOnlyProps) {
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
        <Text style={style} testID="timestamp">
            {time} {date}
        </Text>
    );
}
