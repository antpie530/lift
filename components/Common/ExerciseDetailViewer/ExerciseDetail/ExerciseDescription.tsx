import { Text, View } from "react-native";

import { styles } from "./styles";
import { ExerciseDescriptionProps } from "./types";

export default function ExerciseDescription({ exercise }: ExerciseDescriptionProps) {
    return (
        <View style={styles.descriptionContainer}>
            {exercise && (
                <>
                    <View style={styles.descriptionSchemaWrapper}>
                        <Text style={styles.descriptionSchemaLabel}>Schema</Text>
                        <Text style={styles.descriptionSchemaValue}>{exercise.schema}</Text>
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