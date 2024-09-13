import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import Animated, { FadeInRight, FadeOutLeft, LinearTransition } from "react-native-reanimated";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { lightHaptic } from "@/utils/haptics/haptics";
import { FormValues } from "@/app/(tabs)/_layout";

import { styles } from "../styles";

import Header from "./Header";
import Set from "./Set";

interface WeightThrowsSetsProps {
    removeSet: (index: number) => void;
    sets: FieldArrayWithId<FormValues, `exercises.${number}.sets`, "keyName">[]
    exerciseIndex: number;
    control: Control<FormValues>;
}

export default function WeightThrowsSets({ exerciseIndex, removeSet, sets, control }: WeightThrowsSetsProps) {
    return (
        <View style={styles.container}>
            <Header />
            {sets.map((set, index) => (
                <Set 
                    control={control}
                    exerciseIndex={exerciseIndex}
                    set={set}
                    setIndex={index}
                    removeSet={removeSet}
                    key={set.keyName}
                />
            ))}
        </View>
    )
}