import { Text, TouchableOpacity, View} from "react-native";
import Feather from '@expo/vector-icons/Feather';

import { lightHaptic } from "@/utils/haptics/haptics";

import { styles } from "./styles";
import { ConfirmationHeaderProps } from "./types";

export default function ConfirmationHeader({ header, closeConfirmation }: ConfirmationHeaderProps) {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    closeConfirmation();
                }}
                style={styles.exitButtonWrapper}
            >
                <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{header}</Text>
            <View style={[styles.exitButtonWrapper, { opacity: 0 }]}>
                <Feather name="x" size={24} color="white" />
            </View>
        </View>
    )
}