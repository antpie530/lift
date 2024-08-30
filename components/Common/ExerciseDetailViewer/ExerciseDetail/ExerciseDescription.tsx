import { StyleSheet, Text, View } from "react-native";

import { Exercise } from "@/db/schema";

interface ExerciseDescriptionProps {
    exercise?: Exercise;
}

export default function ExerciseDescription({ exercise }: ExerciseDescriptionProps) {
    return (
        <View style={styles.container}>
            {exercise && (
                <>
                    <View style={styles.schemaWrapper}>
                        <Text style={styles.schemaLabel}>Schema</Text>
                        <Text style={styles.schemaValue}>{exercise.schema}</Text>
                    </View>
                    <View>
                        <Text style={styles.descriptionLabel}>Description</Text>
                        <Text style={styles.descriptionValue}>{exercise.description}</Text>
                    </View>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    schemaWrapper: {
        paddingBottom: 12
    },
    schemaLabel: {
        color: "white",
        fontSize: 24,
        fontWeight: "700",
        marginRight: 10
    },
    schemaValue: {
        color: "rgba(200, 200, 200, 1)",
        fontSize: 16,
        fontWeight: "600"
    },
    descriptionLabel: {
        color: "white",
        fontSize: 24,
        fontWeight: "700",
        marginRight: 10
    },
    descriptionValue: {
        color: "rgba(200, 200, 200, 1)",
        fontSize: 16,
        fontWeight: "600"
    }
})