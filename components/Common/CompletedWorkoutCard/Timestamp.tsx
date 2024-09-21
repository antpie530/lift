import { StyleSheet, Text, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface TimestampProps {
    timestamp: number;
}

export default function Timestamp({ timestamp }: TimestampProps) {
    const dateObj = new Date(timestamp);

    const date = dateObj.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const time = dateObj.toLocaleTimeString("en-US", {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true 
    });

    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <FontAwesome6 name="calendar-days" size={20} color="white" />
            </View>
            <View style={styles.timeStampWrapper}>
                <Text style={styles.date}>{time} {date}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 5
    },
    iconWrapper: {
        paddingRight: 5
    },
    timeStampWrapper: {
        justifyContent: "flex-end"
    },
    date: {
        color: "white",
        fontSize: 18,
        fontWeight: "600"
    }
})