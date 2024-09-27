import { WeightThrowsProps } from "../../types";

import Header from "./Header";
import Set from "./Set";

export default function WeightThrows({ sets }: WeightThrowsProps) {
    return (
        <>
            <Header />
            {sets.map((set, index) => (
                <Set key={set.id} id={set.id} weight={set.weight} throws={set.throws} setNumber={index + 1} />
            ))}
        </>
    )
}