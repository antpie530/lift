import { Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { TabProps } from "./types";

export default function Tab({ name, icon, href, color }: TabProps) {
    return (
        <Link href={href} asChild>
            <TouchableOpacity style={{ alignItems: "center", paddingTop: 5 }}>
                {icon}
                <Text style={[{ color: color, fontSize: 12, paddingTop: 3 }]}>{name}</Text>
            </TouchableOpacity>
        </Link>
    )
}