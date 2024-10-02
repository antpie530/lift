import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { db } from "@/db/db";
import migrations from "@/drizzle/migrations";

const queryClient = new QueryClient();

export default function RootLayout() {
    const { error, success } = useMigrations(db, migrations);

    if (error) {
        return (
            <View>
                <Text>Database migrations error: {error.message}</Text>
            </View>
        );
    }

    if (!success) {
        return (
            <View>
                <Text>Database loading...</Text>
            </View>
        );
    }
    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
