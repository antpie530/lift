import { Text, View } from "react-native";

import ScreenWrapper from "@/components/Views/ScreenWrapper";

export default function Traq() {
    return (
        <ScreenWrapper name="traq" >
            <View style={{ height: 50, backgroundColor: "orange" }} />
            <View style={{ height: 50, backgroundColor: "violet" }} />
        </ScreenWrapper>
    )
}