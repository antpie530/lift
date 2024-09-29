import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { lightHaptic } from "@/utils/haptics/haptics";

interface FiltersProps {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    openCreateExerciseForm: () => void;
}

export default function Filters({ searchValue, setSearchValue, openCreateExerciseForm }: FiltersProps) {
    return (
        <View style={styles.container}>
            <View style={styles.textInputWrapper}>
                <TextInput 
                    placeholder="Search exercise..."
                    value={searchValue}
                    onChangeText={setSearchValue}
                    style={styles.textInput}
                    returnKeyType="done"
                    clearButtonMode="always"
                />
            </View>
            <TouchableOpacity
                    onPress={() => {
                        lightHaptic();
                        openCreateExerciseForm();
                    }}
                    style={styles.addButtonWrapper}
                >
                <FontAwesome6 name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "rgba(210, 210, 210, 1)",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    textInputWrapper: {
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 10,
        flex: 1
    },
    textInput: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 10,
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        paddingHorizontal: 12,
        paddingVertical: 7,
        width: "100%"
    },
    addButtonWrapper: {
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 8,
        padding: 5
    }
})