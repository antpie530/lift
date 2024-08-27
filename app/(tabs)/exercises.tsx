import { SafeAreaView, Text } from "react-native";

import Exercises from "@/components/Views/Exercises/Exercises";
import ScreenWrapper from "@/components/Views/ScreenWrapper";

export default function ExercisesScreen() {
    return (
        <ScreenWrapper name="Exercises" >
            <Exercises />
        </ScreenWrapper>
    )
}