import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

const expoDB = openDatabaseSync("db.db");
expoDB.execSync("PRAGMA foreign_keys = ON");
export const db = drizzle(expoDB);