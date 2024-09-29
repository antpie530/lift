import { createContext } from "react";
import { SchemaTypes } from "@/types/commonTypes";

export interface HandleDeleteSetProps {
    exerciseId: number;
    schema: SchemaTypes; 
    id: number;
}

export const DeleteSetFromEditContext = createContext({
    handleDeleteSet: (data: HandleDeleteSetProps) => {}
});