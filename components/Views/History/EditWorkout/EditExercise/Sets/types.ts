import { SchemaTypes } from "@/types/commonTypes"
import { RepsOnlySet, SetType, TimeOnlySet, WeightRepsSet, WeightThrowsSet } from "@/db/services/types"

export interface RepsOnlyProps {
    sets: RepsOnlySet[];
    exerciseId: number;
}

export interface SetsProps {
    exerciseId: number;
    schema: SchemaTypes;
    sets: SetType[];
}

export interface RepsOnlySetProps {
    id: number;
    reps: number;
    setNumber: number;
    exerciseId: number;
}

export interface TimeOnlyProps {
    sets: TimeOnlySet[];
    exerciseId: number;
}

export interface TimeOnlySetProps {
    id: number;
    time: number;
    setNumber: number;
    exerciseId: number;
}

export interface WeightRepsProps {
    sets: WeightRepsSet[];
    exerciseId: number;
}

export interface WeightRepsSetProps {
    id: number;
    weight: number;
    reps: number;
    setNumber: number;
    exerciseId: number;
}

export interface WeightThrowsProps {
    sets: WeightThrowsSet[];
    exerciseId: number;
}

export interface WeightThrowsSetProps {
    id: number;
    weight: number;
    throws: number;
    setNumber: number;
    exerciseId: number;
}