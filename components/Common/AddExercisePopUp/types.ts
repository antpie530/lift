import { ExerciseInput } from "@/types/commonTypes";

export interface AddExercisePopUpProps {
    showAddExercisePopUp: boolean;
    closeAddExercisePopUp: () => void;
    addExercises: (exercises: ExerciseInput[]) => void;
}

export interface FiltersProps {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    openCreateExerciseForm: () => void;
}

export interface HeaderProps {
    close: () => void;
    selectedExerciseCount: number;
    onAdd: () => void;
}