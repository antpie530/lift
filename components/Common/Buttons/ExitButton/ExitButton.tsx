import { TouchableOpacity } from "react-native";
import Feather from '@expo/vector-icons/Feather';

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
        >
            <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
    )
}