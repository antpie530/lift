import Animated from "react-native-reanimated";

import { styles } from "./styles";
import { TabBarProps } from "./types";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Tab from "./Tab";

export default function TabBar({ state, height, offset }: TabBarProps) {
    const activeTabIndex = state.index;
    const activeTabName = state.routes[activeTabIndex].name;

    return (
        <Animated.View style={[styles.container, { height: height }, offset]}>
            <Tab
                name="analytics"
                color={"analytics" === activeTabName ? "rgba(230, 230, 230, 1)" : "rgba(130, 130, 130, 1)"}
                href="/analytics"
                icon={
                    <Ionicons
                        name="analytics"
                        size={20}
                        color={"analytics" == activeTabName ? "rgba(230, 230, 230, 1)" : "rgba(130, 130, 130, 1)"} 
                    />
                }
            />
            <Tab
                name="lift"
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