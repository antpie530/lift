import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import Popover from "react-native-popover-view/dist/Popover";

import { TimeUnits, TimeOnly } from "@/types/commonTypes";

import { lightHaptic } from "@/utils/haptics/haptics";
import { styles } from "../styles";
import { updateFormat } from "../../../../../../../utils/timeUtils";

import UnitButton from "../UnitButton";

interface HeaderProps {
    exerciseIndex: number;
}

export default function Header({ exerciseIndex }: HeaderProps) {
    const [showPopper, setShowPopper] = useState(false);
    const { control, setValue } = useFormContext();

    const allSets = useWatch({
        control,
        name: `exercises.${exerciseIndex}.sets`
    });

    const sets: TimeOnly[] = allSets.filter(
        (set): set is TimeOnly => (set as TimeOnly).time !== undefined
    );

    const onUnitSelect = (prevUnit: TimeUnits, unit: TimeUnits, onChange: (unit: string) => void) => {
        sets.forEach((set, index) => {
            const newValue = updateFormat(set.time, prevUnit, unit);
            setValue(`exercises.${exerciseIndex}.sets.${index}.time`, newValue);
        });
        onChange(unit);
        setShowPopper(false);
    }

    return (
        <View style={styles.headers}>
            <View style={styles.setColumn}>
                <Text style={styles.headerText}>Set</Text>
            </View>
            <View style={styles.schemaColumns}>
                <View style={styles.timeColumn}>
                    <Controller 
                        control={control}
                        name={`exercises.${exerciseIndex}.schemaUnits.timeUnit`}
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
                                <UnitButton unit="seconds" onPress={() => onUnitSelect(value, "seconds", onChange)} />
                                <UnitButton unit="minutes" onPress={() => onUnitSelect(value, "minutes", onChange)} />
                                <UnitButton unit="hours" onPress={() => onUnitSelect(value, "hours", onChange)} />
                                <UnitButton unit="MM:SS" onPress={() => onUnitSelect(value, "MM:SS", onChange)} />
                                <UnitButton unit="MM:SS.SS" onPress={() => onUnitSelect(value, "MM:SS.SS", onChange)} />
                                <UnitButton unit="HH:MM" onPress={() => onUnitSelect(value, "HH:MM", onChange)} />
                                <UnitButton unit="HH:MM:SS" onPress={() => onUnitSelect(value, "HH:MM:SS", onChange)} />
                            </Popover>
                        )}
                    />
                </View>
                <View style={styles.statusColumn}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
            </View>
        </View>
    )
}