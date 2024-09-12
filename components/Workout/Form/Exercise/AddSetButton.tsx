import { StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { lightHaptic } from "@/utils/haptics/haptics";

interface AddSetButtonProps {
    addSet: () => void;
}

export default function AddSetButton({ addSet }: AddSetButtonProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    addSet();
                }}
                style={styles.buttonWrapper}
            >  
                <View style={{ paddingRight: 6 }}>
                    <FontAwesome6 name="add" size={20} color="white"/>
                </View>
                <FontAwesome6 name="dumbbell" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    buttonWrapper: {
        backgroundColor: "rgba(0, 0, 0, .4)",
        borderRadius: 8,
        flexDirection: "row",
        padding: 5
    }
})