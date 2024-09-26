import { SchemaTypes } from "@/types/commonTypes";
import { SetType } from "@/db/services/types";

export interface EditExerciseProps {
    id: number;
    exerciseId: number;
    name: string;
    notes: string | null;
    schema: SchemaTypes;
    sets: SetType[];
    onDelete: () => void;
}