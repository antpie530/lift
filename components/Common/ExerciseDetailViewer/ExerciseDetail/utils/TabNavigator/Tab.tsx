import { Pressable, Text } from "react-native";
import { ActiveTab } from "../../ExerciseDetail";
import { Position } from "./TabNavigator";
import React from "react";

interface TabProps {
    position: Position;
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<ActiveTab>>;
    name: ActiveTab;
}

export default function Tab({ position, active, setActive, name }: TabProps) {
    return (
        <Pressable 
            onPress={() => setActive(name)}
            style={{
                backgroundColor: active ? "rgba(164, 78, 222, 1)" : "transparent",
                borderColor: "rgba(164, 78, 222, 1)",
                borderTopLeftRadius: position == "Left" ? 40 : 0,
                borderBottomLeftRadius: position == "Left" ? 40 : 0,
                borderTopRightRadius: position == "Right" ? 50 : 0,
                borderBottomRightRadius: position == "Right" ? 50 : 0,
                borderWidth: 1,
                borderRightWidth: position == "Right" ? 1 : 0,
                padding: 10,
                margin: -.5,
            }}
        >
            <Text
                style={{
                    color: active ? "rgba(255, 255, 255, 1)" : "rgba(164, 78, 222, 1)",
                    fontSize: 16,
                    fontWeight: "500",
                }}
            >
                {name}
            </Text>
        </Pressable>
    )
}