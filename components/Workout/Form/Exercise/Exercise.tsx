import Header from "./Header";

interface ExerciseProps {
    name: string;
    id: number;
    removeExercise: (id: number) => void;
}

export default function Exercise({ name, id, removeExercise }: ExerciseProps) {
    return (
        <>
            <Header name={name} id={id} removeExercise={removeExercise} />
        </>
    )
}