import { SetType } from "@/db/services/types"
import { SchemaTypes } from "@/types/commonTypes"

export const getDefaultSetValues = (id: number, schema: SchemaTypes): SetType => {
    if (schema === SchemaTypes.RepsOnly) {
        return {
            id: id,
            reps: 0
        }
    } else if (schema === SchemaTypes.TimeOnly) {
        return {
            id: id,
            time: 0
        }
    } else if (schema === SchemaTypes.WeightReps) {
        return {
            id: id,
            weight: 0,
            reps: 0
        }
    } else {
        return {
            id: id,
            weight: 0,
            throws: 0
        }
    }
}