import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

import { lightHaptic } from "@/utils/haptics/haptics";

import { styles } from "./styles";
import { AddSetButtonProps } from "./types";

export default function AddSetButton({ addSet }: AddSetButtonProps) {
    return (
        <Animated.View
            layout={LinearTransition}
            style={styles.container}
            testID={"add-set-button"}
        >
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    addSet();
                }}
                style={styles.buttonWrapper}
                testID="add-set-touchable"
            >
                <View style={{ paddingRight: 6 }} testID="add-set-plus-icon">
                    <FontAwesome6 name="add" size={20} color="white" />
                </View>
                <View testID="add-set-dumbbell-icon">
                    <FontAwesome6 name="dumbbell" size={20} color="white" />
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}
