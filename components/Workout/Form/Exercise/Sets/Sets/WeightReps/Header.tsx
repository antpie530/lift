import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view/dist/Popover";
import { Controller, useFormContext } from "react-hook-form";

import { lightHaptic } from "@/utils/haptics/haptics";

import UnitButton from "../UnitButton";

import { styles } from "../styles";

interface HeaderProps {
    exerciseIndex: number;
}

export default function Header({ exerciseIndex }: HeaderProps) {
    const [showPopper, setShowPopper] = useState(false);
    const { control } = useFormContext();

    const onUnitSelect = (unit: string, onChange: (unit: string) => void) => {
        onChange(unit);
        setShowPopper(false);
    }

    return (
        <View style={styles.headers}>
            <View style={styles.setColumn}>
                <Text style={styles.headerText}>Set</Text>
            </View>
            <View style={styles.schemaColumns}>
                <View style={styles.weightColumn}>
                    <Controller 
                        control={control}
                        name={`exercises.${exerciseIndex}.schemaUnits.weightUnit`}
                        render={({ field: { onChange, value } }) => (
                            <Popover
                                from={(
                                    <TouchableOpacity
                                        onPress={() => {
                                            lightHaptic();
                                            setShowPopper(true);
                                        }}
                                    >
                                        <Text style={styles.headerText}>{value}</Text>
                                    </TouchableOpacity>
                                )}
                                isVisible={showPopper}
                                arrowSize={{ height: 0, width: 0}}
                                onRequestClose={() => setShowPopper(false)}
                                popoverStyle={styles.optionsPopover}
                                backgroundStyle={{ backgroundColor: "rgba(0, 0, 0, .3)"}}
                            >
                                <UnitButton unit="lbs" onPress={() => onUnitSelect("lbs", onChange)} />
                                <UnitButton unit="kg" onPress={() => onUnitSelect("kg", onChange)} />
                                <UnitButton unit="oz" onPress={() => onUnitSelect("oz", onChange)} />
                                <UnitButton unit="g" onPress={() => onUnitSelect("g", onChange)} />
                            </Popover>
                        )}
                    />
                </View>
                <View style={styles.repsColumn}>
                    <Text style={styles.headerText}>Reps</Text>
                </View>
                <View style={styles.statusColumn}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
            </View>
        </View>
    )
}