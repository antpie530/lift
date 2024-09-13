import { KeyboardAvoidingView, Platform, TouchableHighlight, View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { UseFormGetValues, UseFormSetValue, Control } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExerciseInput, FormValues } from "@/app/(tabs)/_layout";
import { lightHaptic } from "@/utils/haptics/haptics";

import AddExerciseButton from "../AddExerciseButton";
import CancelButton from "../CancelButton";
import Exercise from "./Exercise/Exercise";

interface FormProps {
    data: ExerciseInput[];
    openAddExercisePopUp: () => void;
    setValue: UseFormSetValue<FormValues>;
    remove: () => void;
    move: (from: number, to: number) => void;
    control: Control<FormValues>;
    getValues: UseFormGetValues<FormValues>;
}

export default function Form({ remove, data, openAddExercisePopUp, control, move, getValues, setValue }: FormProps) {
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
                onDragBegin={() => lightHaptic()}
                onDragEnd={({ data, from, to }) => move(from, to)}
                onPlaceholderIndexChange={() => lightHaptic()}
                keyExtractor={item => item.id.toString()}
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
                                control={control}  
                                schema={item.schema}
                                getValues={getValues}
                                setValue={setValue}
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