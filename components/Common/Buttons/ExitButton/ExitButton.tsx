import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity, View } from "react-native";

import { lightHaptic } from "@/utils/haptics/haptics";

import { styles } from "./styles";
import { ExitButtonProps } from "./types";

export default function ExitButton({ onPress }: ExitButtonProps) {
    return (
        <TouchableOpacity
            onPress={() => {
                lightHaptic();
                onPress();
            }}
            style={styles.container}
            testID="exit-button"
        >
            <View testID="exit-button-icon">
                <Feather name="x" size={24} color="white" />
            </View>
        </TouchableOpacity>
    );
}
