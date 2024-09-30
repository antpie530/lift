import { useRef } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import { styles } from "./styles";

export default function AnimatedHeader() {
    const animation = useRef<LottieView>(null);
    
    return (
        <View style={styles.headerContainer}>
            <LottieView 
                autoPlay
                loop={false}
                ref={animation}
                style={{ height: 150, width: 150 }}
                source={require("@/assets/animations/successAnimation.json")}
            />
        </View>
    )
}