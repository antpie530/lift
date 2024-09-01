import React, { useState } from "react";

import ExerciseDetail from "./ExerciseDetail/ExerciseDetail";
import EditExerciseForm from "@/components/Forms/EditExercise/EditExerciseForm";

interface ExerciseDetailViewerProps {
    showDetails: boolean;
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}

export default function ExerciseDetailViewer({ id, showDetails, setShowDetails }: ExerciseDetailViewerProps) {
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
            <ExerciseDetail id={id} openForm={openForm} showForm={showForm} closeForm={closeForm} showDetails={showDetails} closeDetails={closeDetails}/>
        </>
    )
}