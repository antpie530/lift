import React, { useState } from "react";

import ExerciseDetail from "./ExerciseDetail/ExerciseDetail";
import EditExerciseForm from "@/components/Forms/EditExercise/EditExerciseForm";

interface ExerciseDetailViewerProps {
    showDetails: boolean;
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ExerciseDetailViewer({ showDetails, setShowDetails }: ExerciseDetailViewerProps) {
    const [showForm, setShowForm] = useState(false);

    const openDetails = () => setShowDetails(true);
    const closeDetails = () => setShowDetails(false);

    const openForm = () => {
        closeDetails();
        setShowForm(true);
    }
    const closeForm = () => {
        setShowForm(false);
        openDetails();
    }

    return (
        <>
            <ExerciseDetail openForm={openForm} showDetails={showDetails} closeDetails={closeDetails}/>
            <EditExerciseForm showForm={showForm} closeForm={closeForm}/>
        </>
    )
}