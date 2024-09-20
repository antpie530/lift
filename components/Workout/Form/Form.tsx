import { KeyboardAvoidingView, Platform, TouchableHighlight, View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExerciseInput } from "@/types/commonTypes";
import { lightHaptic } from "@/utils/haptics/haptics";

import FormHeader from "./FormHeader";
import AddExerciseButton from "../AddExerciseButton";
import CancelButton from "../CancelButton";
import Exercise from "./Exercise/Exercise";

interface FormProps {
    data: ExerciseInput[];
    openAddExercisePopUp: () => void;
    remove: () => void;
    move: (from: number, to: number) => void;
}

export default function Form({ remove, data, openAddExercisePopUp, move }: FormProps) {
    const bottomInsetHeight = useSafeAreaInsets().bottom;
    
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <DraggableFlatList
                containerStyle={{ flex: 1 }}
                data={data}
                ListHeaderComponent={() => <FormHeader />}
                onDragBegin={() => lightHaptic()}
                onDragEnd={({ data, from, to }) => move(from, to)}
                onPlaceholderIndexChange={() => lightHaptic()}
                keyExtractor={item => item.uid}
                renderItem={({ item, drag, isActive, getIndex }) => (
                    <ScaleDecorator>
                        <TouchableHighlight
                            onLongPress={drag}
                            disabled={isActive}
                            underlayColor="transparent"
                        >
                            <Exercise 
                                index={getIndex() as number} 
                                name={item.name} 
                                id={item.id} 
                                removeExercise={remove}   
                                schema={item.schema}
                            />   
                        </TouchableHighlight>
                    </ScaleDecorator>
                )}
                ListFooterComponent={() => (
                    <>
                        <AddExerciseButton openAddExercisePopUp={openAddExercisePopUp}/>
                        <CancelButton />
                        <View style={{ height: bottomInsetHeight }}/>
                    </>
                )}
            />
        </KeyboardAvoidingView>
    )
}