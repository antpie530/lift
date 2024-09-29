import { View } from "react-native";

import Timestamp from "@/components/Common/Timestamp";
import Duration from "@/components/Common/Duration";

interface TimeDataDisplayProps {
    startTimestamp: number;
    duration: number;
}

export default function TimeDataDisplay({ startTimestamp, duration }: TimeDataDisplayProps) {
    return (
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <Timestamp timestamp={startTimestamp} />
            <Duration duration={duration} />
        </View>
    )
}