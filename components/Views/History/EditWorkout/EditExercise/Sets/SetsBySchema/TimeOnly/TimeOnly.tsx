import { TimeOnlyProps } from "../../types"

import Header from "./Header"
import Set from "./Set"

export default function TimeOnly({ sets }: TimeOnlyProps) {
    return (
        <>
            <Header />
            {sets.map((set, index) => (
                <Set key={set.id} id={set.id} time={set.time} setNumber={index + 1} />
            ))}
        </>
    )
}