import { memo, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { WorkoutContext } from "@/hooks/workoutContext";

function formatTime(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor( (totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const minutesFormat = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    const secondsFormat = seconds < 10 ? `0${seconds}` : `${seconds}`;

    if (hours > 0) {
        return `${hours}:` + minutesFormat + secondsFormat;
    }
    return minutesFormat + secondsFormat;
}

interface EllapsedTimeProps {
    startTime: number;
}

const EllapsedTimeChild = memo(({ startTime }:EllapsedTimeProps) => {
    const [ellapsedTime, setEllapsedTime] = useState(0);

    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
                const timePassed = Math.floor((Date.now() - startTime) / 1000);
                setEllapsedTime(timePassed);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setEllapsedTime(0);
        }
    }, [startTime]);

    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>{startTime && formatTime(ellapsedTime)}</Text>
        </View>
    )
}, (prevProp, newProp) => prevProp.startTime == newProp.startTime || newProp.startTime === 0);

export default function EllapsedTime() {
    const { startTime } = useContext(WorkoutContext);

    return <EllapsedTimeChild startTime={startTime} />
}



const styles = StyleSheet.create({
    container: {
    },
    timeText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    }
})