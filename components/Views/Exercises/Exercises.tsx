import { useState } from "react";
import { Button, Text, View } from "react-native";

import CreateExerciseForm from "@/components/Forms/CreateExercise/CreateExerciseForm";
import ExerciseDetailViewer from "@/components/Common/ExerciseDetailViewer/ExerciseDetailViewer";

export default function Exercises() {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <Text>Exercises</Text>
            <Button title="Open Details" onPress={() => setShowDetails(true)} />
            <ExerciseDetailViewer showDetails={showDetails} setShowDetails={setShowDetails} />
        </View>
    )
}