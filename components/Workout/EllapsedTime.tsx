import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
    startTime: number | undefined;
}

export default function EllapsedTime({ startTime }: EllapsedTimeProps) {
    const [ellapsedTime, setEllapsedTime] = useState(0);
    
    console.log(startTime, ellapsedTime);

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
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    timeText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    }
})