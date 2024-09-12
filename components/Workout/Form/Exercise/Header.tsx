import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import Entypo from '@expo/vector-icons/Entypo';
import { lightHaptic } from "@/utils/haptics/haptics";

import ExerciseDetailViewer from "@/components/Common/ExerciseDetailViewer/ExerciseDetailViewer";
import RemoveButton from "./Buttons/RemoveButton";
import NotesVisibilityButton from "./Buttons/NotesVisibilityButton";

interface HeaderProps {
    index: number;
    name: string;
    id: number;
    removeExercise: (index: number) => void;
    notesVisible: boolean;
    closeNotes: () => void;
    openNotes: () => void;
}

export default function Header({ index, name, id, removeExercise, notesVisible, closeNotes, openNotes }: HeaderProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [showPopper, setShowPopper] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    lightHaptic();
                    setShowDetails(true);
                }}
                style={styles.nameWrapper}
            >
                <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
            <Popover
                isVisible={showPopper}
                arrowSize={{ height: 0, width: 0}}
                placement={PopoverPlacement.LEFT}
                onRequestClose={() => setShowPopper(false)}
                popoverStyle={styles.optionsPopover}
                backgroundStyle={{ backgroundColor: "rgba(0, 0, 0, .3)"}}
                from={(
                    <TouchableOpacity 
                        onPress={() => {
                            lightHaptic();
                            setShowPopper(true);
                        }}
                        style={styles.options}
                    >
                        <Entypo name="dots-three-horizontal" size={24} color="white" />
                    </TouchableOpacity>
                )}
            >
                <RemoveButton 
                    name={name} 
                    removeExercise={() => {
                        setShowPopper(false);
                        removeExercise(index);
                    }} 
                />
                <NotesVisibilityButton 
                    notesVisible={notesVisible}
                    closeNotes={() => {
                        closeNotes();
                        setShowPopper(false);
                    }}
                    openNotes={() => {
                        openNotes();
                        setShowPopper(false);
                    }}
                />
            </Popover>
            <ExerciseDetailViewer id={id} showDetails={showDetails} setShowDetails={setShowDetails}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 15,
        width: "100%"
    },
    nameWrapper: {
        alignItems: "center",
        justifyContent: "flex-end"
    },
    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "700"
    },
    options: {
        alignItems: "center",
        backgroundColor: "rgba(145, 145, 145, .5)",
        borderRadius: 8,
        justifyContent: "center",
        paddingVertical: 0,
        paddingHorizontal: 5
    },
    optionsPopover: {
        backgroundColor: "rgba(73, 76, 82, 1)",
        borderRadius: 15,
        padding: 10,
        width: 200
    }
})