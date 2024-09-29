import { View } from "react-native";

import ExitButton from "@/components/Common/Buttons/ExitButton";

interface HeaderProps {
    closeWorkout: () => void;
}

export default function Header({ closeWorkout }: HeaderProps) {
    return (
        <View style={{ flexDirection: "row", padding: 15 }}>
            <ExitButton onPress={closeWorkout} />
        </View>
    )
}