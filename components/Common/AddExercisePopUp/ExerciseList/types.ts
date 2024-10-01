import { Exercise } from "@/db/schema";
import { ExerciseInput } from "@/types/commonTypes";

export interface ExerciseItemProps {
    name: string,
    schema: string,
    selected: boolean,
    onPress: () => void;
}

export interface ExerciseListProps {
    data: Exercise[];
    selectedExercises: Map<number, ExerciseInput>;
    addExercise: (exercise: ExerciseInput) => void;
    removeExercise: (id: number) => void; 
}