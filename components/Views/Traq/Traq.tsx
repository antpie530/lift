import { StyleSheet, View } from "react-native";

import StartBlankWorkout from "./StartBlankButton";

export default function Traq() {
    return (
        <View style={styles.container}>
            <StartBlankWorkout />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})