import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import TimestampOnly from "@/components/Common/Timestamp/TimestampOnly";

import Rows from "./Rows/Rows";
import { styles } from "./styles";
import { HistoryCardProps } from "./types";

export default function HistoryCard({
    schema,
    timestamp,
    sets,
}: HistoryCardProps) {
    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.exerciseHistoryCard}
        >
            <TimestampOnly timestamp={timestamp} style={styles.timestamp} />
            <Rows schema={schema} sets={sets} />
        </Animated.View>
    );
}
