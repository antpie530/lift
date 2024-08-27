import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { db } from "@/db/db";

export default function RootLayout() {
  const { error, success } = useMigrations(db, migrations)

  if (error) {
    return (
      <View>
        <Text>Database migrations error: {error.message}</Text>
      </View>
    )
  }

  if (!success) {
    return (
      <View>
        <Text>Database loading...</Text>
      </View>
    )
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
    </Stack>
  );
}
