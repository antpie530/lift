import { createContext } from "react";

export const WorkoutContext = createContext({
    openWorkout: () => {},
    closeWorkout: () => {}
});