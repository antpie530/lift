import { eq } from "drizzle-orm";
import { db } from "../db";
import { schemaRepsOnly, schemaTimeOnly, schemaWeightReps, schemaWeightThrows } from "../schema";
import { SchemaTypes } from "@/types/commonTypes";
import { DeleteSetFromEditData } from "./types";

export const deleteSetFromEdit = async (data: DeleteSetFromEditData) => {
    if (data.schema === SchemaTypes.RepsOnly) {
        return await db.delete(schemaRepsOnly).where(eq(schemaRepsOnly.id, data.id));
    } else if (data.schema === SchemaTypes.TimeOnly) {
        return await db.delete(schemaTimeOnly).where(eq(schemaTimeOnly.id, data.id));
    } else if (data.schema === SchemaTypes.WeightReps) {
        return await db.delete(schemaWeightReps).where(eq(schemaWeightReps.id, data.id));
    } else if (data.schema === SchemaTypes.WeightThrows) {
        return await db.delete(schemaWeightThrows).where(eq(schemaWeightThrows.id, data.id));
    }
}