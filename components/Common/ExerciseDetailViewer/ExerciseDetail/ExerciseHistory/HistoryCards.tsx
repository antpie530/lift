import { FlatList } from "react-native";

import HistoryCard from "./HistoryCard";
import { styles } from "./styles";
import { HistoryCardsProps } from "./types";

export default function HistoryCards({ schema, history }: HistoryCardsProps) {
    return (
        <FlatList
            contentContainerStyle={styles.exerciseHistoryCards}
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <HistoryCard
                    schema={schema}
                    timestamp={item.timestamp}
                    sets={item.sets}
                />
            )}
        />
    );
}
