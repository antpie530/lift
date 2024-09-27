import { RepsOnlyProps } from "../../types";

import Header from "./Header";
import Set from "./Set";

export default function RepsOnly({ sets }: RepsOnlyProps) {
    return (
        <>
            <Header />
            {sets.map((set, index) => (
                <Set key={set.id} setNumber={index + 1} id={set.id} reps={set.reps} />
            ))}
        </>
    )
}