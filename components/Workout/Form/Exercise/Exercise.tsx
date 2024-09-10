import Header from "./Header";

interface ExerciseProps {
    index: number | undefined;
    name: string;
    id: number;
    removeExercise: (id: number | undefined) => void;
}

export default function Exercise({ index, name, id, removeExercise }: ExerciseProps) {
    return (
        <>
            <Header index={index} name={name} id={id} removeExercise={removeExercise} />
        </>
    )
}