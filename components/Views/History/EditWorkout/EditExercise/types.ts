import { SchemaTypes } from "@/types/commonTypes";
import { Exercise, SetType } from "@/db/services/types";

export interface EditExerciseProps {
    id: number;
    exerciseId: number;
    name: string;
    notes: string | null;
    schema: SchemaTypes;
    sets: SetType[];
    onDelete: () => void;
    setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}