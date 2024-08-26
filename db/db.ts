import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

const expoDB = openDatabaseSync("db.db");
export const db = drizzle(expoDB);