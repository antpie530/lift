import { StyleSheet, View } from "react-native";
import {
    BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
    NavigationHelpers,
    ParamListBase,
    TabNavigationState,
} from '@react-navigation/native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Tab from "./Tab";

interface TabBarProps {
    state: TabNavigationState<ParamListBase>;
    height: number;
}

export default function TabBar({ state, height }: TabBarProps) {
    const activeTabIndex = state.index;
    const activeTabName = state.routes[activeTabIndex].name;

    return (
        <View style={[styles.container, { height: height }]}>
            <Tab 
                name="traq"
                color={"index" == activeTabName ? "rgba(230, 230, 230, 1)" : "rgba(130, 130, 130, 1)"}
                href="/"
                icon={
                    <FontAwesome6 
                        name="calendar-days" 
                        size={20} 
                        color={"index" == activeTabName ? "rgba(230, 230, 230, 1)" : "rgba(130, 130, 130, 1)"} 
                    />
                }
            />
            <Tab 
                name="exercises"
                color={"exercises" == activeTabName ? "rgba(230, 230, 230, 1)" : "rgba(130, 130, 130, 1)"}
                href="/exercises"
                icon={
                    <FontAwesome6 
                        name="dumbbell" 
                        size={20} 
                        color={"exercises" == activeTabName ? "rgba(230, 230, 230, 1)" : "rgba(130, 130, 130, 1)"} 
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(73, 76, 82, 1)",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        left: 0,
        paddingTop: 5,
        position: "absolute",
        width: "100%"
    }
})