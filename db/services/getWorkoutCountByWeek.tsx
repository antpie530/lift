import { and, count, gte, lte } from "drizzle-orm";
import { db } from "../db";
import { workout } from "../schema";

function getStartOfWeek(date: Date) {
    const current = new Date(date);
    const dayOfWeek = current.getDay();

    const diff = dayOfWeek;
    current.setDate(current.getDate() - diff);
    current.setHours(0, 0, 0, 0);
    return current;
}

function getWeeklyRanges() {
    const ranges = [];
    const today = new Date();
    const startOfThisWeek = getStartOfWeek(today);

    for (let i = 0; i < 4; i++) {
        const startOfWeek = new Date(startOfThisWeek);
        startOfWeek.setDate(startOfThisWeek.getDate() - i * 7);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        ranges.push({
            start: startOfWeek.getTime(),
            end: endOfWeek.getTime()
        })
    }
    return ranges;
}

export const getWorkoutCountByWeek = async () => {
    const weeklyRanges = getWeeklyRanges();

    const result = await Promise.all(
        weeklyRanges.map(async (range) => {
            const countResult = await db
                .select({
                    count: count(workout.id)
                })
                .from(workout)
                .where(
                    and(
                        gte(workout.startTimestamp, range.start),
                        lte(workout.startTimestamp, range.end)
                    )
                );
            return {
                weekStart: new Date(range.start).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit"
                }),
                count: countResult[0]?.count ?? 0
            };
        })
    );

    return result.reverse();
}