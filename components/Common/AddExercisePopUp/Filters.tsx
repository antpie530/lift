import { TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { lightHaptic } from "@/utils/haptics/haptics";

import { styles } from "./styles";
import { FiltersProps } from "./types";

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
                    style={styles.filterAddButtonWrapper}
                >
                <FontAwesome6 name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}