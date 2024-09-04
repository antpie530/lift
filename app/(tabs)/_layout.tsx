import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TabBar from "@/components/TabBar/TabBar";

export default function TabsLayout() {
    const tabBarHeight = useSafeAreaInsets().bottom + 45;

    return (
        <Tabs 
            screenOptions={{ headerShown: false }}
            tabBar={({ state }) => <TabBar state={state} height={tabBarHeight} />}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="exercises" />
        </Tabs>
    )
}