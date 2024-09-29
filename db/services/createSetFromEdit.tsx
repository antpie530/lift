import { eq, max } from "drizzle-orm";
import { db } from "../db";
import { 
    completedExercise,
    schemaRepsOnly,
    schemaTimeOnly,
    schemaWeightReps,
    schemaWeightThrows
} from "../schema";
import { SchemaTypes } from "@/types/commonTypes";

interface CreateSetFromEditData {
    completedExerciseId: number;
    schema: SchemaTypes
}

export const createSetFromEdit = async (data: CreateSetFromEditData) => {
    let table;
    let defaultValues;

    if (data.schema === SchemaTypes.RepsOnly) {
        table = schemaRepsOnly;
        defaultValues = {
            completedExerciseId: data.completedExerciseId,
            reps: 0
        }
    } else if (data.schema === SchemaTypes.TimeOnly) {
        table = schemaTimeOnly;
        defaultValues = {
            completedExerciseId: data.completedExerciseId,
            time: 0
        }
    } else if (data.schema === SchemaTypes.WeightReps) {
        table = schemaWeightReps;
        defaultValues = {
            completedExerciseId: data.completedExerciseId,
            weight: 0,
            reps: 0
        }
    } else {
        table = schemaWeightThrows;
        defaultValues = {
            completedExerciseId: data.completedExerciseId,
            weight: 0,
            throws: 0
        }
    }

    const maxSetNumber = await db
        .select({ value: max(table.setNumber) })
        .from(table)
        .where(eq(table.id, data.completedExerciseId));
    const setNumber = maxSetNumber[0]?.value ?? 1;

    defaultValues = {
        ...defaultValues,
        setNumber: setNumber
    }

    const [newSet] = await db.insert(table).values(defaultValues).returning();

    return { id: newSet.id }
}