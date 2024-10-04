import { StyleProp, TextStyle } from "react-native";

export interface TimestampProps {
    timestamp: number;
}

export interface TimestampOnlyProps {
    timestamp: number;
    style: StyleProp<TextStyle>;
}
