import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

import { lightHaptic } from "@/utils/haptics/haptics";


import { styles } from "./styles";
import { OptionsButtonProps } from "./types";

export default function OptionsButton({ onDelete }: OptionsButtonProps) {
    const [showPopper, setShowPopper] = useState(false);

    const handleRemoveExercisePress = () => {
        lightHaptic()
        onDelete();
    };

    return (
        <View>
            <Popover
                isVisible={showPopper}
                arrowSize={{ height: 0, width: 0}}
                placement={PopoverPlacement.LEFT}
                onRequestClose={() => setShowPopper(false)}
                popoverStyle={styles.optionsPopover}
                backgroundStyle={{ backgroundColor: "rgba(0, 0, 0, .3)"}}
                from={() => (
                    <TouchableOpacity 
                        onPress={() => {
                            lightHaptic();
                            setShowPopper(true);
                        }}
                        style={styles.options}
                    >
                        <Entypo name="dots-three-horizontal" size={24} color="rgba(9, 146, 219, 1)" />
                    </TouchableOpacity>
                )}
            >
                <TouchableOpacity
                    onPress={handleRemoveExercisePress}
                    style={styles.popoverButton}
                >
                    <Feather name="x-circle" size={24} color="red" />
                    <Text style={styles.popoverButtonText}>Delete Exercise</Text>
                </TouchableOpacity>
            </Popover>
        </View>
    )
}