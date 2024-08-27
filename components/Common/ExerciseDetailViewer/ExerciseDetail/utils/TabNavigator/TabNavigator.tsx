import { View } from "react-native";
import { ActiveTab } from "../../ExerciseDetail";
import React from "react";

import Tab from "./Tab";

export type Position = "Left" | "Middle" | "Right";

interface TabNavigatorProps {
    activeTab: ActiveTab;
    setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
}

export default function TabNavigator({ activeTab, setActiveTab }: TabNavigatorProps) {
    return (
        <View style={{ flexDirection: "row" }}>
            <Tab position="Left" setActive={setActiveTab} active={activeTab == "Analytics"} name="Analytics"/>
            <Tab position="Middle" setActive={setActiveTab} active={activeTab == "History"} name="History"/>
            <Tab position="Right" setActive={setActiveTab} active={activeTab == "Description"} name="Description"/>
        </View>
    )
}