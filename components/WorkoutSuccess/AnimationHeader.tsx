import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function AnimatedHeader() {
    const animation = useRef<LottieView>(null);
    
    return (
        <View style={styles.container}>
            <LottieView 
                autoPlay
                ref={animation}
                style={{ height: 150, width: 150 }}
                source={require("@/assets/animations/successAnimation.json")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%"
    }
});