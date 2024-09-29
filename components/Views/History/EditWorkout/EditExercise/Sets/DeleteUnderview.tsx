import { View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function DeleteUnderview() {
    return (
        <View style={{ alignItems: "flex-end", justifyContent: "center", flex: 1, backgroundColor: "red" }}>
            <FontAwesome6 name="trash-can" size={24} color="white" />
        </View>
    )
}