import { WeightRepsProps } from "../../types";

import Header from "./Header";
import Set from "./Set";

export default function WeightReps({ sets }: WeightRepsProps) {
    return (
        <>
            <Header />
            {sets.map((set, index) => (
                <Set key={set.id} id={set.id} weight={set.weight} reps={set.reps} setNumber={index + 1} />
            ))}
        </>
    )
}