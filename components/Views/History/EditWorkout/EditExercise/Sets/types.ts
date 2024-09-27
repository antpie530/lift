import { SchemaTypes } from "@/types/commonTypes"
import { RepsOnlySet, SetType} from "@/db/services/types"

export interface RepsOnlyProps {
    sets: RepsOnlySet[];
}

export interface SetsProps {
    schema: SchemaTypes;
    sets: SetType[];
}

export interface RepsOnlySetProps {
    id: number;
    reps: number;
    setNumber: number;
}