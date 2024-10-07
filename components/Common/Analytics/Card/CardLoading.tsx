import ContentLoader, { Rect } from "react-content-loader/native";
import { View, StyleSheet } from 'react-native';

import { COLORS } from "@/constants/Colors";

export default function CardLoading() {
    return (
        <View style={styles.cardContainer}>
            <ContentLoader
                speed={2}
                width="100%"
                height="100%"
                backgroundColor={COLORS.secondary}
                foregroundColor="#d4d4d4"
            >
                <Rect x="0" y="0" rx="10" ry="10" width="70%" height="30" />
                <Rect x="43%" y="35" rx="6" ry="6" width="55%" height="55" />
                <Rect x="63%" y="95" rx="4" ry="4" width="35%" height="20" />
            </ContentLoader>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        borderColor: COLORS.secondary,
        borderRadius: 35,
        borderWidth: 1,
        flex: 1,
        padding: 15,
    },
});