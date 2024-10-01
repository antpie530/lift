import { ExerciseSummary } from "../Common/CompletedWorkoutCard/types";

export interface WorkoutSuccessPopupProps {
    showPopup: boolean;
    closePopup: () => void;
    name: string;
    startTimestamp: number;
    duration: number;
    exercises: ExerciseSummary[];
}