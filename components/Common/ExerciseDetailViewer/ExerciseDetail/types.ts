import { Exercise } from "@/db/schema";

export interface ExerciseDescriptionProps {
    exercise?: Exercise;
}

export type ActiveTab = "Analytics" | "History" | "Description";

export interface ExerciseDetailProps {
    showDetails: boolean;
    closeDetails: () => void;
    showForm: boolean;
    openForm: () => void;
    closeForm: () => void;
    id: number;
}