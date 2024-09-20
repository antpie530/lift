import { StyleSheet } from "react-native";
import {
    ParamListBase,
    TabNavigationState,
} from '@react-navigation/native';
import Animated, { AnimatedStyle } from "react-native-reanimated"

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Tab from "./Tab";

interface TabBarProps {
    state: TabNavigationState<ParamListBase>;
    height: number;
    offset: AnimatedStyle;
}

export default function TabBar({ state, height, offset }: TabBarProps) {
    const activeTabIndex = state.index;
    const activeTabName = state.routes[activeTabIndex].name;

    return (
        <Animated.View style={[styles.container, { height: height }, offset]}>
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
            <Tab 
                name="history"
                color={"history" == activeTabName ? "rgba(230, 230, 230, 1)" : "rgba(130, 130, 130, 1)"}
                href="/history"
                icon={
                    <FontAwesome5 
                        name="history" 
                        size={20} 
                        color={"history" == activeTabName ? "rgba(230, 230, 230, 1)" : "rgba(130, 130, 130, 1)"} 
                    />
                }
            />
        </Animated.View>
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